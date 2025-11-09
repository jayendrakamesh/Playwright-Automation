import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export class OnboardingPages {

  //Expert home page components
  readonly page: Page
  readonly actionsMenu: Locator
  readonly addEmployeeButton: Locator


  constructor(page: Page){
    this.page = page 
    this.actionsMenu = page.getByRole('button', { name: 'Actions'});

  }
}
