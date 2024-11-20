import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:4200',  // Your app's local or deployed URL
    headless: true,  // Set to false for debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});