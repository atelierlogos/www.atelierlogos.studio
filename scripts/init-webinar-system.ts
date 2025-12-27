#!/usr/bin/env bun

/**
 * Webinar System Initialization Script
 *
 * This script initializes the webinar system by:
 * 1. Creating the PostgreSQL database tables
 * 2. Running migrations (creating tables)
 * 3. Optionally creating a test admin user
 */

import { initializeDatabase } from "../lib/db/init";
import { addHost } from "../lib/webinar-db";
import { sql } from "../lib/db/postgres";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

async function main() {
  console.log("🚀 Initializing Webinar System...\n");

  // Step 1: Initialize database
  console.log("📦 Creating database and tables...");
  await initializeDatabase();
  console.log("✅ Database initialized\n");

  // Step 2: Check if we need to create a test user
  const args = process.argv.slice(2);
  const createTestUser = args.includes("--create-test-user");

  if (createTestUser) {
    console.log("👤 Creating test admin user...");

    // Create a test user
    const userId = nanoid();
    const now = Date.now();

    try {
      // Insert test user
      await sql`
        INSERT INTO "user" (id, name, email, "emailVerified", role, "createdAt", "updatedAt")
        VALUES (${userId}, ${"Test Admin"}, ${"admin@example.com"}, true, ${"admin"}, ${now}, ${now})
        ON CONFLICT (email) DO NOTHING
      `;

      // Create account for the user (password: "password123")
      const accountId = nanoid();
      // Generate a proper bcrypt hash of "password123"
      const hashedPassword = await bcrypt.hash("password123", 10);

      await sql`
        INSERT INTO account (
          id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt"
        ) VALUES (${accountId}, ${userId}, ${userId}, ${"credential"}, ${hashedPassword}, ${now}, ${now})
        ON CONFLICT DO NOTHING
      `;

      // Make user a host
      await addHost(userId);

      console.log("✅ Test admin user created");
      console.log("   Email: admin@example.com");
      console.log("   Password: password123");
      console.log("   User ID:", userId);
      console.log(
        "\n⚠️  Remember to change the password in production!\n"
      );
    } catch (error) {
      console.error("❌ Error creating test user:", error);
    }
  }

  // Step 3: Display environment variables needed
  console.log("📝 Required Environment Variables:");
  console.log("   DATABASE_URL=<your-postgres-connection-string>");
  console.log("   BETTER_AUTH_SECRET=<generate-a-random-secret>");
  console.log("   BETTER_AUTH_URL=http://localhost:3000");
  console.log("   VIDEOSDK_API_KEY=<your-videosdk-api-key>");
  console.log("   VIDEOSDK_SECRET=<your-videosdk-secret>");
  console.log("\n💡 Get VideoSDK credentials from: https://app.videosdk.live/\n");

  console.log("✨ Webinar system initialized successfully!");
  console.log("\nNext steps:");
  console.log("1. Set up your environment variables in .env.local");
  console.log("2. Run: bun dev");
  console.log("3. Navigate to /webinars/admin to manage webinars");
  console.log("4. Make yourself a host by running this script with --create-test-user\n");
}

main().catch((error) => {
  console.error("❌ Initialization failed:", error);
  process.exit(1);
});
