import { Injectable } from '@angular/core';
import config from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor() {}

  private request(method: string, endpoint: string, body?) {
    return fetch(config.server_url + endpoint, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    });
  }

  async send(params, endpoint: string, method?) {
    const res = await this.request(method || 'POST', endpoint, params);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(await res.text());
    }
  }

  async get(endpoint: string) {
    const res = await this.request('GET', endpoint);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(await res.text());
    }
  }
}
