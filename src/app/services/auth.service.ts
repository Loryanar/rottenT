import { Injectable } from '@angular/core';
import config from 'src/config';

import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private request: RequestService) {}

  async login(params): Promise<boolean> {
    try {
      await this.request.send(params, 'auth/login');
      localStorage.setItem(config.local_keys.logged, 'true');
      localStorage.setItem(config.local_keys.username, params.username);
      return true;
    } catch {
      return false;
    }
  }

  async register(params): Promise<boolean> {
    try {
      await this.request.send(params, 'auth/register');
      localStorage.setItem(config.local_keys.logged, 'true');
      localStorage.setItem(config.local_keys.username, params.username);
      return true;
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(config.local_keys.logged);
    localStorage.removeItem(config.local_keys.username);
  }
}
