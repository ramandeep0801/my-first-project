const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');
test('Kasper Patient Audit', async ({ page, context }, testInfo) => {
test.setTimeout(180000);
const options = testInfo.project.use;
const sitePage = new ScheduleLocatorsPage(page);
await page.goto('/dashboard');
await page.waitForTimeout(5000);

await sitePage.clickButton(sitePage.locators.setting);
await page.waitForTimeout(2000);
  
await sitePage.clickButton(sitePage.locators.scheduling);
await page.waitForTimeout(5000);

await sitePage.clickButton(sitePage.locators.schedulingLink);
await page.waitForTimeout(5000);

const [newPage] = await Promise.all([
    context.waitForEvent('page'), 
    sitePage.clickButton(sitePage.locators.link) 
  ]);

 await newPage.waitForLoadState('domcontentloaded');
  const newSitePage = new ScheduleLocatorsPage(newPage);

  await newSitePage.clickButton(newSitePage.locators.newPatient);
  await newSitePage.clickButton(newSitePage.locators.visitReason);
  
  const anyProviderEl = newPage.locator(newSitePage.locators.anyProvider);
  await anyProviderEl.waitFor({ state: 'visible', timeout: 15000 });
  await anyProviderEl.click();
  await page.waitForTimeout(5000);
  await newSitePage.clickButton(newSitePage.locators.newTime);
  await page.waitForTimeout(5000);

  await newPage.locator(newSitePage.locators.firstName).fill(options.testData.formData.firstName);
  await newPage.locator(newSitePage.locators.lastName).fill(options.testData.formData.lastName);
  await newPage.locator(newSitePage.locators.DOB).fill(options.testData.formData.dob);
  await newPage.locator(newSitePage.locators.phone).fill(options.testData.formData.phone);
  await newSitePage.clickButton(newSitePage.locators.continueButton);
  await page.waitForTimeout(5000);

  /*await sitePage.clickButton(sitePage.locators.communication),
  await page.waitForTimeout(5000);

  const searchIt = await page.locator(sitePage.locators.search);
  searchIt.fill(options.testData.patientSearchName);
  await page.waitForTimeout(5000);

  const otpText = await page.locator(sitePage.locators.chatBox).last().textContent();
  const otp = otpText.trim();
  console.log('Extracted OTP:', otp);

  const otpMatch = otpText.match(/\b\d{6}\b/);
  const extractedOtp = otpMatch ? otpMatch[0] : '';
  console.log('Extracted OTP:', extractedOtp);

  // Target all 6 input boxes and type each digit into its corresponding box
  const otpInputs = newPage.locator(newSitePage.locators.otpCode);
  for (let i = 0; i < extractedOtp.length; i++) {
    await otpInputs.nth(i).fill(extractedOtp[i]);
  }

  await newSitePage.clickButton(newSitePage.locators.verify);*/
  await newPage.locator(newSitePage.locators.radioYes).click();
  await newPage.locator(newSitePage.locators.radioSubscriberNo).click();
  await newPage.locator(newSitePage.locators.policyFirstName).fill(options.testData.formData.PolicyFirstName);
  await newPage.locator(newSitePage.locators.policyLastName).fill(options.testData.formData.PolicyLastName);
  await newPage.locator(newSitePage.locators.policyBirthDate).fill(options.testData.formData.PolicyDOB);
  await newPage.locator(newSitePage.locators.patientEmail).fill(options.testData.formData.patientEmail);
  await newSitePage.clickButton(newSitePage.locators.selectInsuranceCheck);
  await newSitePage.clickButton(newSitePage.locators.selectFirstCheck);
  await newPage.locator(newSitePage.locators.subscriberID).fill;;(options.testData.formData.subscriberID);
  await newPage.locator(newSitePage.locators.groupNumber).fill(options.testData.formData.groupNumber);
  await newPage.locator(newSitePage.locators.employer).fill(options.testData.formData.employer);
  await newPage.locator(newSitePage.locators.insurancePhone).fill(options.testData.formData.insurancePhone);
  await newPage.locator(newSitePage.locators.checkAgree).check();
  await newSitePage.clickButton(newSitePage.locators.scheduleAppointmant);
  const scheduleApptBtn = newPage.locator(
  newSitePage.locators.scheduleAppointment || newSitePage.locators.scheduleAppointmant
  );
  await page.waitForTimeout(8000);
  await newPage.close();
  await sitePage.clickButton(sitePage.locators.audit);
  await page.waitForTimeout(5000);
    
  const hiddenDetails = await page.locator(sitePage.locators.hiddenDetails);
  await hiddenDetails.first().waitFor({ state: 'visible', timeout: 15000 });
  await hiddenDetails.click({force: true});

  await page.waitForTimeout(5000);
  await sitePage.clickButton(sitePage.locators.details);
  const modalContent = page.locator(sitePage.locators.verifyAll);
  await modalContent.waitFor({ state: 'visible', timeout: 15000 });

  const fullText = await modalContent.innerText();
  console.log("--- ALL MODAL CONTENT ---");
  console.log(fullText);
  console.log("-------------------------");
  })