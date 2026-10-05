const { test, expect, chromium } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Kasper Patient Audit', async ({ page, context }, testInfo) => {
  test.setTimeout(120000);
  const options = testInfo.project.use;
  const sitePage = new ScheduleLocatorsPage(page);
  
  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.setting);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.userManagement);
  await page.waitForTimeout(2000);
  
  const editButton = page.locator(sitePage.locators.editDetails);
  await editButton.waitFor({ state: 'visible' });
  await editButton.click();

  const editPermissionLocator = page.locator(sitePage.locators.editPermission);
  await editPermissionLocator.waitFor({ state: 'visible' });
  await editPermissionLocator.click({ force: true });

  await page.waitForTimeout(2000);

  const userTypeText = await page.locator(sitePage.locators.userTypeDrop).textContent();
  const value = userTypeText ? userTypeText.trim() : '';

  if (value === 'General User') {
    await sitePage.clickButton(sitePage.locators.userTypeDrop);
    await page.waitForTimeout(2000);
    const admin = await page.locator(sitePage.locators.adminUser);
    await admin.click();
    await page.waitForTimeout(2000);
  } else {
    await sitePage.clickButton(sitePage.locators.userTypeDrop);
    await page.waitForTimeout(2000);
    await sitePage.clickButton(sitePage.locators.generalUser);
    await page.waitForTimeout(2000);

    const toggles = page.locator(sitePage.locators.radioEditPermission);
    const count = await toggles.count();

    for (let i = 0; i < count; i++) {
      const toggle = toggles.nth(i);
      if (await toggle.isChecked()) {
        await toggle.click({ force: true });
        await page.waitForTimeout(300);
      }
    }

    const togglesToEnable = [
      sitePage.locators.radioViewAnalytics,
      sitePage.locators.radioThirdParty,
      sitePage.locators.radioTasks
    ];

      for (const locatorPath of togglesToEnable) {
      const toggle = page.locator(locatorPath);
      if (!(await toggle.isChecked())) {
        await toggle.click({ force: true });
        await page.waitForTimeout(300);
      }
    }
  }

  await sitePage.clickButton(sitePage.locators.updateUser);
  await page.waitForTimeout(5000);

  const browser2 = await chromium.launch({ channel: 'chrome', headless: false });
  const browser = context.browser();
  const context2 = await browser.newContext({
    storageState: { cookies: [], origins: [] } 
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

  await sitePage2.clickButton(sitePage2.locators.setting);
  await page2.waitForTimeout(2000);
  //await sitePage2.clickButton(sitePage2.locators.userManagement);
  //await page2.waitForTimeout(2000);

  await page2.waitForTimeout(5000);
});