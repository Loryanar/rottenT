import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {User} from '../auth/user';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


  export class LoginPage  {
    private UserLogin:User;
    private almacenar: Storage;
    resultado: string;
    Form = new FormGroup({
     
      Username: new FormControl('', [Validators.required]),
    
     password: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(15)])),
     
     
     });
    constructor(private auth: AuthService) { 
      
    }
  
   
  login() {
      
      if (this.Form.valid){
        this.resultado = "Todos los datos son válidos";
        console.log(this.resultado);
      this.auth.login(this.UserLogin).subscribe(async res =>{
        if (res){
          this.almacenar.set("token",res);
          window.location.replace("http://localhost:8102/tabs")
        }
      })
    }
      else{
        this.resultado = "Hay datos inválidos en el formulario";
        console.log(this.resultado)}
      }
    
  

}