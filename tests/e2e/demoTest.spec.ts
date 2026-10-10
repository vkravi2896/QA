import { test } from '@playwright/test';
import { DemoPage } from '../pages/DemoPage';
import testData from '../data/testdata.json';
import {locators} from '../pages/locators/loc'

test('Fill text box', async ({ page }) => {
  const demoPage = new DemoPage(page);
  await demoPage.navigateToDemoPage();
  await demoPage.clickOnElement(locators.elementsLink);
  await demoPage.clickOnElement(locators.link)
  await demoPage.clickHomeLink();
  // await demoPage.fillTextBoxData(testData.testData);
  // await demoPage.clickOnElement(locators.submitButton);
});

test.skip('Form open in new tab', async({ page })=>{
  const demoPage = new DemoPage(page);
  await demoPage.navigateToDemoPage();
  await page.pause();
  await demoPage.clickHomeLink();
});

test('Switch between new tab and previous tab', async ({ page }) => {
  const previousPage = page;
  const demoPage = new DemoPage(page);
  await demoPage.navigateToDemoPage();
  const newPagePromise = previousPage.waitForEvent('popup');
  await demoPage.clickHomeLink();
  const newPage = await newPagePromise;
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.bringToFront();
  // Interact with the new tab here.
  await previousPage.bringToFront();
  // Interact with the previous tab here.
});
