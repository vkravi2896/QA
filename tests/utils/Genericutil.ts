import { Page } from '@playwright/test';

export class CommonUtils {

    static async waitForPageLoad(page: Page) {
        await page.waitForLoadState('domcontentloaded');
    }

    static async refreshPage(page: Page) {
        await page.reload();
    }

    static async goBack(page: Page) {
        await page.goBack();
    }

    static async goForward(page: Page) {
        await page.goForward();
    }

static getCurrentUrl(page: Page) {
        return page.url();
    }
    
     static async getPageTitle(page: Page) {
        return await page.title();
    }

    static async scrollToBottom(page: Page) {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    static async scrollToTop(page: Page) {
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }

    static generateRandomNumber() {
        return Math.floor(Math.random() * 100000);
    }

    static generateRandomEmail() {
        return `ravi${Date.now()}@test.com`;
    }
}

