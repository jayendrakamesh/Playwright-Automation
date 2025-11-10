import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export class NavBar {

  //Navbar components
  readonly page: Page
  readonly menuButton: Locator
  
  //System Settings
  readonly systemSettings: Locator

  constructor(page: Page){
    this.page = page 
    this.menuButton = page.locator('sdf-icon-button[class="burger hydrated"]');

    this.systemSettings = page.getByRole('link',{name: 'System settings', exact: true});

  }
}
