import { Page } from '@playwright/test';
import { locators } from './locators/loc';
import { env } from '../utils/Config/env';

let page: Page;

export class DemoPage {
  constructor(p: Page) {
    page = p;
  }

  async navigateToDemoPage(): Promise<void> {
    await page.goto(env.demoUrl);
    await page.waitForLoadState('load');
  }

  async clickOnElement(locatorValue: string): Promise<void> {
    await page.locator(locatorValue).click();
  }

  textBoxButton() {
    return page.locator(locators.textBoxButton);
  }

  async fillTextBoxData(formData: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }): Promise<void> {
    await page.locator(locators.fullNameTextBox).fill(formData.fullName);
    await page.locator(locators.emailTxtBox).fill(formData.email);
    await page.locator(locators.currentAddressTxtBox).fill(formData.currentAddress);
    await page.locator(locators.permanentAddressTxtBox).fill(formData.permanentAddress);
  }

  async submitButton(): Promise<void> {
    await page.locator(locators.submitButton).click();
  }

  async clickHomeLink(): Promise<void> {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator(locators.HomeLink).click(),
    ]);

    await newPage.waitForLoadState('load');
    const appUrl = newPage.url();
    console.log('URL of NewPage: ' + appUrl);
  }

  // Perform actions in a new tab and then return to the previous tab.
  async clickHomeLink1(): Promise<void> {
    const previousPage = page;
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator(locators.HomeLink).click(),
    ]);

    await newPage.waitForLoadState('load');

    const appUrl = newPage.url();
    console.log('URL of New Page: ' + appUrl);

    await newPage.bringToFront();
    await newPage.locator('input, textarea').first().fill('Test');

    await previousPage.bringToFront();
    await previousPage.locator('button').first().click();

    await newPage.bringToFront();
    await newPage.locator('button').first().click();

    await previousPage.bringToFront();
    await previousPage.locator('button').first().click();

    console.log('Current URL: ' + previousPage.url());
  }
}
