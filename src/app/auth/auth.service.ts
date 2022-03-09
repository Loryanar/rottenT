
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { BehaviorSubject } from  'rxjs';
import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'https://restapi-mr.herokuapp.com';
  authSubject  =  new  BehaviorSubject(false);
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) {
    
   }
   login(user: User){
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/log`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        
        }
      })
    );
  }
}
