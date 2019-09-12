import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  };
  constructor() {
    this.local(this.settings);
  }

  local(settings) {
    if (localStorage.getItem('settings') != null) {
      localStorage.getItem(settings);
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
