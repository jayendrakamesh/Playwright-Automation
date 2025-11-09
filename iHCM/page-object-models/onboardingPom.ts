import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export class OnboardingPages {

  //Expert home page components
  readonly page: Page
  readonly actionsMenuButton: Locator
  readonly actionsMenuDropdown: Locator
  readonly addEmployeeButton: Locator


  constructor(page: Page){
    this.page = page 
    this.actionsMenuButton = page.getByRole('button', { name: 'Actions'});
    this.actionsMenuDropdown = page.getByRole('menu');

  }
}
