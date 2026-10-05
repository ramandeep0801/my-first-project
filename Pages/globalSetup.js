const { chromium } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('./ScheduleLocatorsPage');
const path = require('path');
const fs = require('fs');

async function globalSetup(config) {
  const { baseURL, testData } = config.projects[0].use;

  const userDataDir = path.join(__dirname, 'user-chrome-data');
  const authDir = path.join(__dirname, '../playwright/.auth');
  const authFilePath = path.join(authDir, 'user.json');

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chrome',
    headless: false,
    args: ['--start-maximized']
  });

  // Re-use default tab from persistent context instead of creating a second one
  const page = context.pages()[0] || (await context.newPage());
  const sitePage = new ScheduleLocatorsPage(page);

  await sitePage.openURL(baseURL);

  // Check if we are already logged in before trying to interact with login inputs
  const emailInput = page.locator(sitePage.locators.email);

  try {
    // Wait up to 5 seconds to see if the login page loads
    await emailInput.waitFor({ state: 'visible', timeout: 5000 });

    // Perform login if the element is found
    await emailInput.fill(testData.email);
    await page.locator(sitePage.locators.password).fill(testData.password);
    await sitePage.clickButton(sitePage.locators.loginButton);
    await page.waitForLoadState('networkidle');
  } catch (error) {
    console.log('Already logged in or login form not visible. Skipping authentication step.');
  }

  // Save state for project dependency re-use
  await context.storageState({ path: authFilePath });

  // Fix: Close the persistent context, not 'browser'
  await context.close();
}

module.exports = globalSetup;