const { test, expect, chromium } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Kasper paperless Group archive/unarchive & Rename', async ({ page, context }, testInfo) => {
  test.setTimeout(180000);
  const options = testInfo.project.use;
  const sitePage = new ScheduleLocatorsPage(page);
  
  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.paperlessForm);
  await page.waitForTimeout(4000)

  await sitePage.clickButton(sitePage.locators.renameClick);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.renameIt);
  await page.waitForTimeout(2000);
  
  await page.locator(sitePage.locators.renameTextBox).fill('testing group-1sdf');
  await page.waitForTimeout(3000);

  await sitePage.clickButton(sitePage.locators.renameButton);
  await page.waitForTimeout(3000);

  await sitePage.clickButton(sitePage.locators.renameClickAgain);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.renameIt);
  await page.waitForTimeout(2000);
  
  await page.locator(sitePage.locators.renameTextBox).fill('test group-1sdf');
  await page.waitForTimeout(3000);

  await sitePage.clickButton(sitePage.locators.renameButton);
  await page.waitForTimeout(3000);

  await sitePage.clickButton(sitePage.locators.renameClick);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.archiveGroup);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.archives);
  await page.waitForTimeout(3000);

  await page.locator(sitePage.locators.archivesOptions).nth(2).click();
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.unarchive);
  await page.waitForTimeout(2000);

})