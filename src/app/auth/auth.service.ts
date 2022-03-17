
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { BehaviorSubject } from  'rxjs';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'https://rotten-t.herokuapp.com';
  authSubject  =  new  BehaviorSubject(false);
  myToken: any;

  constructor(private httpClient: HttpClient){
this.myToken="";
  }
    setToken(values){
      this.myToken=values;
    }
    getToken(){
      return this.myToken;
    }
 
   login(user: User){
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/log`, user).pipe(
      tap(async (res: AuthResponse) => {

        this.setToken(res.token);
      })
    );
  }
}
