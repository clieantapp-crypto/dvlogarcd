import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const geoConfig = pgTable("geo_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  redirectUrl: text("redirect_url").notNull().default("https://google.com"),
  redirectCountries: text("redirect_countries").array().notNull().default(sql`ARRAY['KW', 'JO']`),
  isActive: boolean("is_active").notNull().default(true),
});

export const geoAnalytics = pgTable("geo_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipAddress: text("ip_address").notNull(),
  countryCode: text("country_code"),
  wasRedirected: boolean("was_redirected").notNull().default(false),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  abVariant: text("ab_variant"),
});

export const ipWhitelist = pgTable("ip_whitelist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipAddress: text("ip_address").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const abTestConfig = pgTable("ab_test_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  redirectUrl: text("redirect_url").notNull(),
  trafficPercentage: integer("traffic_percentage").notNull().default(50),
  isActive: boolean("is_active").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGeoConfigSchema = createInsertSchema(geoConfig).omit({ id: true });
export const insertGeoAnalyticsSchema = createInsertSchema(geoAnalytics).omit({ id: true, timestamp: true });
export const insertIpWhitelistSchema = createInsertSchema(ipWhitelist).omit({ id: true, createdAt: true });
export const insertAbTestConfigSchema = createInsertSchema(abTestConfig).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GeoConfig = typeof geoConfig.$inferSelect;
export type InsertGeoConfig = z.infer<typeof insertGeoConfigSchema>;
export type GeoAnalytics = typeof geoAnalytics.$inferSelect;
export type InsertGeoAnalytics = z.infer<typeof insertGeoAnalyticsSchema>;
export type IpWhitelist = typeof ipWhitelist.$inferSelect;
export type InsertIpWhitelist = z.infer<typeof insertIpWhitelistSchema>;
export type AbTestConfig = typeof abTestConfig.$inferSelect;
export type InsertAbTestConfig = z.infer<typeof insertAbTestConfigSchema>;
