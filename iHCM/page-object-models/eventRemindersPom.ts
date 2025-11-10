import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';
import { baseCreds } from '../global-data/globalCredentials.js';

export class EventRemindersPages {

  //Expert home page components
  readonly page: Page
  readonly reminderAddButton: Locator


  constructor(page: Page){
    this.page = page 

    this.reminderAddButton = this.page.getByRole('button', {name: 'Add'});
    
  }
}
