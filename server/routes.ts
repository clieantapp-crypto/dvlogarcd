import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertGeoConfigSchema, insertIpWhitelistSchema, insertAbTestConfigSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/health", async (_req, res) => {
    const config = await storage.getGeoConfig();
    res.json({ 
      status: "ok",
      redirectUrl: config?.redirectUrl || "https://google.com",
      redirectCountries: config?.redirectCountries || ["KW", "JO"]
    });
  });

  app.get("/api/config", async (_req, res) => {
    const config = await storage.getGeoConfig();
    res.json(config);
  });

  app.put("/api/config", async (req, res) => {
    try {
      const parsed = insertGeoConfigSchema.parse(req.body);
      const updated = await storage.updateGeoConfig(parsed);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid configuration" });
    }
  });

  app.get("/api/analytics", async (_req, res) => {
    const analytics = await storage.getAnalytics(100);
    res.json(analytics);
  });

  app.get("/api/analytics/summary", async (_req, res) => {
    const summary = await storage.getAnalyticsSummary();
    res.json(summary);
  });

  app.get("/api/whitelist", async (_req, res) => {
    const whitelist = await storage.getWhitelist();
    res.json(whitelist);
  });

  app.post("/api/whitelist", async (req, res) => {
    try {
      const parsed = insertIpWhitelistSchema.parse(req.body);
      const created = await storage.addToWhitelist(parsed);
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid whitelist entry" });
    }
  });

  app.delete("/api/whitelist/:id", async (req, res) => {
    await storage.removeFromWhitelist(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/ab-tests", async (_req, res) => {
    const tests = await storage.getAbTestConfigs();
    res.json(tests);
  });

  app.post("/api/ab-tests", async (req, res) => {
    try {
      const parsed = insertAbTestConfigSchema.parse(req.body);
      const created = await storage.createAbTestConfig(parsed);
      res.json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid A/B test configuration" });
    }
  });

  app.put("/api/ab-tests/:id", async (req, res) => {
    try {
      const updated = await storage.updateAbTestConfig(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ error: "A/B test not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid A/B test configuration" });
    }
  });

  app.delete("/api/ab-tests/:id", async (req, res) => {
    await storage.deleteAbTestConfig(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/bypass", (_req, res) => {
    res.cookie("geo_bypass", "true", {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({ success: true, message: "Bypass cookie set for 24 hours" });
  });

  app.delete("/api/bypass", (_req, res) => {
    res.clearCookie("geo_bypass");
    res.json({ success: true, message: "Bypass cookie cleared" });
  });

  return httpServer;
}
