const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Kasper PaperlessForms active/Inactive', async ({ page, context }, testInfo) => {
  test.setTimeout(80000);
  const options = testInfo.project.use;
  const sitePage = new ScheduleLocatorsPage(page);

  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.setting);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.userManagement);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.activeInactive);
  await page.waitForTimeout(2000);

  const actInact = await page.locator(sitePage.locators.changeInactive);
  await actInact.waitFor({ state: 'visible' });
  await actInact.click({ force: true });
  await page.waitForTimeout(8000);

  // --- Spawn a 100% clean, isolated second context using the existing browser ---
  const browser = context.browser();
  const context2 = await browser.newContext({
    storageState: { cookies: [], origins: [] } // Ensures zero saved session data
  });
  const page2 = await context2.newPage();
  const sitePage2 = new ScheduleLocatorsPage(page2);

  await sitePage2.openURL(options.baseURL);

  const emailInput2 = page2.locator(sitePage2.locators.email); 
  await emailInput2.waitFor({ state: 'visible' });
  await emailInput2.fill(options.testData.email1);

  await page2.locator(sitePage2.locators.password).fill(options.testData.password);
  await sitePage2.clickButton(sitePage2.locators.loginButton);
  await page2.waitForTimeout(5000);

  await page.bringToFront();

  await sitePage.clickButton(sitePage.locators.activeInactive);
  await page.waitForTimeout(2000);

  const active = await page.locator(sitePage.locators.changeInactive);
  await active.waitFor({ state: 'visible' });
  await active.click({ force: true });
  await page.waitForTimeout(5000);

  await page2.bringToFront();

  const emailagain = page2.locator(sitePage2.locators.email); 
  await emailagain.waitFor({ state: 'visible' });
  await emailagain.fill(options.testData.email1);

  await page2.locator(sitePage2.locators.password).fill(options.testData.password);
  await sitePage2.clickButton(sitePage2.locators.loginButton);
  await page2.waitForTimeout(5000);

});