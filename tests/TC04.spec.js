const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Kasper Patient Audit verify', async ({ page, context }, testInfo) => {
  test.setTimeout(90000);
  const options = testInfo.project.use;
  const sitePage = new ScheduleLocatorsPage(page);
  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.audit);
  await page.waitForTimeout(5000);
    
  const hiddenDetails = await page.locator(sitePage.locators.hiddenDetails);
  await hiddenDetails.first().waitFor({ state: 'visible', timeout: 15000 });
  await hiddenDetails.click({ force: true });

  await page.waitForTimeout(5000);
  await sitePage.clickButton(sitePage.locators.details);
  await page.waitForTimeout(5000);

  // Target the container div directly to capture all text inside it
  const modalContent = page.locator(sitePage.locators.verifyAll);
  await modalContent.waitFor({ state: 'visible', timeout: 15000 });

  const fullText = await modalContent.innerText();
  console.log("--- ALL MODAL CONTENT ---");
  console.log(fullText);
  console.log("-------------------------");
});