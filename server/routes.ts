import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok",
      redirectUrl: process.env.REDIRECT_URL || "https://google.com",
      redirectCountries: ["KW", "JO"]
    });
  });

  app.get("/api/geo-config", (_req, res) => {
    res.json({
      redirectUrl: process.env.REDIRECT_URL || "https://google.com",
      redirectCountries: ["KW", "JO"],
      description: "Users from Kuwait (KW) and Jordan (JO) are redirected. Search bots are allowed through."
    });
  });

  return httpServer;
}
