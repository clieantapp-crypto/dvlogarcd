import { 
  type GeoConfig, type InsertGeoConfig,
  type GeoAnalytics, type InsertGeoAnalytics,
  type IpWhitelist, type InsertIpWhitelist,
  type AbTestConfig, type InsertAbTestConfig,
  geoConfig, geoAnalytics, ipWhitelist, abTestConfig
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getGeoConfig(): Promise<GeoConfig | undefined>;
  updateGeoConfig(config: InsertGeoConfig): Promise<GeoConfig>;
  
  logAnalytics(data: InsertGeoAnalytics): Promise<GeoAnalytics>;
  getAnalytics(limit?: number): Promise<GeoAnalytics[]>;
  getAnalyticsSummary(): Promise<{ countryCode: string; count: number; redirected: number }[]>;
  
  getWhitelist(): Promise<IpWhitelist[]>;
  addToWhitelist(data: InsertIpWhitelist): Promise<IpWhitelist>;
  removeFromWhitelist(id: string): Promise<void>;
  isIpWhitelisted(ip: string): Promise<boolean>;
  
  getAbTestConfigs(): Promise<AbTestConfig[]>;
  createAbTestConfig(config: InsertAbTestConfig): Promise<AbTestConfig>;
  updateAbTestConfig(id: string, config: Partial<InsertAbTestConfig>): Promise<AbTestConfig | undefined>;
  deleteAbTestConfig(id: string): Promise<void>;
  getActiveAbTest(): Promise<AbTestConfig | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getGeoConfig(): Promise<GeoConfig | undefined> {
    const configs = await db.select().from(geoConfig).limit(1);
    if (configs.length === 0) {
      const newConfig = await db.insert(geoConfig).values({
        redirectUrl: "https://google.com",
        redirectCountries: ["KW", "JO"],
        isActive: true,
      }).returning();
      return newConfig[0];
    }
    return configs[0];
  }

  async updateGeoConfig(config: InsertGeoConfig): Promise<GeoConfig> {
    const existing = await this.getGeoConfig();
    if (existing) {
      const updated = await db.update(geoConfig)
        .set(config)
        .where(eq(geoConfig.id, existing.id))
        .returning();
      return updated[0];
    }
    const newConfig = await db.insert(geoConfig).values(config).returning();
    return newConfig[0];
  }

  async logAnalytics(data: InsertGeoAnalytics): Promise<GeoAnalytics> {
    const result = await db.insert(geoAnalytics).values(data).returning();
    return result[0];
  }

  async getAnalytics(limit = 100): Promise<GeoAnalytics[]> {
    return db.select().from(geoAnalytics).orderBy(desc(geoAnalytics.timestamp)).limit(limit);
  }

  async getAnalyticsSummary(): Promise<{ countryCode: string; count: number; redirected: number }[]> {
    const result = await db.execute(sql`
      SELECT 
        COALESCE(country_code, 'Unknown') as "countryCode",
        COUNT(*)::int as count,
        SUM(CASE WHEN was_redirected THEN 1 ELSE 0 END)::int as redirected
      FROM geo_analytics
      GROUP BY country_code
      ORDER BY count DESC
      LIMIT 20
    `);
    return result.rows as { countryCode: string; count: number; redirected: number }[];
  }

  async getWhitelist(): Promise<IpWhitelist[]> {
    return db.select().from(ipWhitelist).orderBy(desc(ipWhitelist.createdAt));
  }

  async addToWhitelist(data: InsertIpWhitelist): Promise<IpWhitelist> {
    const result = await db.insert(ipWhitelist).values(data).returning();
    return result[0];
  }

  async removeFromWhitelist(id: string): Promise<void> {
    await db.delete(ipWhitelist).where(eq(ipWhitelist.id, id));
  }

  async isIpWhitelisted(ip: string): Promise<boolean> {
    const result = await db.select().from(ipWhitelist).where(eq(ipWhitelist.ipAddress, ip)).limit(1);
    return result.length > 0;
  }

  async getAbTestConfigs(): Promise<AbTestConfig[]> {
    return db.select().from(abTestConfig).orderBy(desc(abTestConfig.name));
  }

  async createAbTestConfig(config: InsertAbTestConfig): Promise<AbTestConfig> {
    const result = await db.insert(abTestConfig).values(config).returning();
    return result[0];
  }

  async updateAbTestConfig(id: string, config: Partial<InsertAbTestConfig>): Promise<AbTestConfig | undefined> {
    const result = await db.update(abTestConfig)
      .set(config)
      .where(eq(abTestConfig.id, id))
      .returning();
    return result[0];
  }

  async deleteAbTestConfig(id: string): Promise<void> {
    await db.delete(abTestConfig).where(eq(abTestConfig.id, id));
  }

  async getActiveAbTest(): Promise<AbTestConfig | undefined> {
    const result = await db.select().from(abTestConfig)
      .where(eq(abTestConfig.isActive, true))
      .limit(1);
    return result[0];
  }
}

export const storage = new DatabaseStorage();
