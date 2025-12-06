import type { Request, Response, NextFunction } from "express";
import { log } from "./index";

const REDIRECT_URL = process.env.REDIRECT_URL || "https://google.com";

const REDIRECT_COUNTRIES = ["KW", "JO"];

const GOOGLE_BOT_PATTERNS = [
  /googlebot/i,
  /google-inspectiontool/i,
  /googleother/i,
  /google-extended/i,
  /google-safety/i,
  /google-site-verification/i,
  /adsbot-google/i,
  /mediapartners-google/i,
  /feedfetcher-google/i,
  /apis-google/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
];

function isSearchBot(userAgent: string): boolean {
  if (!userAgent) return false;
  return GOOGLE_BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

function normalizeIp(ip: string): string {
  if (ip.startsWith("::ffff:")) {
    return ip.substring(7);
  }
  return ip;
}

function getClientIp(req: Request): string {
  let ip = "";
  
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (xForwardedFor) {
    const ips = Array.isArray(xForwardedFor) 
      ? xForwardedFor[0] 
      : xForwardedFor.split(",")[0];
    ip = ips.trim();
  } else {
    const xRealIp = req.headers["x-real-ip"];
    if (xRealIp) {
      ip = Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;
    } else {
      ip = req.socket.remoteAddress || req.ip || "";
    }
  }
  
  return normalizeIp(ip);
}

interface GeoResponse {
  country_code?: string;
  country?: string;
  error?: boolean;
}

const geoCache = new Map<string, { country: string | null; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

async function getCountryFromIp(ip: string): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return null;
  }
  
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.country;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        "User-Agent": "GeoGate/1.0",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      log(`Geo lookup failed for ${ip}: ${response.status}`, "geo");
      return null;
    }
    
    const data: GeoResponse = await response.json();
    
    if (data.error) {
      log(`Geo lookup error for ${ip}`, "geo");
      return null;
    }
    
    const country = data.country_code || null;
    geoCache.set(ip, { country, timestamp: Date.now() });
    
    return country;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      log(`Geo lookup timeout for ${ip}`, "geo");
    } else {
      log(`Geo lookup exception for ${ip}: ${error}`, "geo");
    }
    return null;
  }
}

export async function geoRedirectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (req.path.startsWith("/api") || req.path.startsWith("/@") || req.path.includes(".")) {
    return next();
  }
  
  const userAgent = req.headers["user-agent"] || "";
  
  if (isSearchBot(userAgent)) {
    log(`Search bot detected: ${userAgent.substring(0, 50)}...`, "geo");
    return next();
  }
  
  const clientIp = getClientIp(req);
  log(`Client IP: ${clientIp}`, "geo");
  
  const country = await getCountryFromIp(clientIp);
  log(`Country detected: ${country || "unknown"}`, "geo");
  
  if (country && REDIRECT_COUNTRIES.includes(country)) {
    log(`Redirecting user from ${country} to ${REDIRECT_URL}`, "geo");
    res.redirect(302, REDIRECT_URL);
    return;
  }
  
  next();
}
