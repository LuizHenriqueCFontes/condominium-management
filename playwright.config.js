
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/integration",

  fullyParallel: false,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: process.env.API_BASE_URL || "http://localhost:8080",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },
});
