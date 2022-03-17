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
    private almacenar: AuthService;
    
    resultado: string;
    Form = new FormGroup({
     
      nick: new FormControl('', [Validators.required]),
    
     contrasena: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(15)])),
     
      
     });
      
    constructor(private auth: AuthService) { 
      
    }
 
   
  log() {
      
      if (this.Form.valid){
        this.resultado = "Todos los datos son válidos";
        console.log(this.Form)
        console.log(this.resultado);
        this.UserLogin={
          nick:this.Form.value.nick,
          contrasena: this.Form.value.contrasena,
        }
      this.auth.login(this.UserLogin).subscribe(async res =>{
        if (res){
          window.location.replace("http://localhost:8100/tabs")
        }
      })
    }
      else{
        this.resultado = "Hay datos inválidos en el formulario";
        console.log(this.resultado)}
      }
    
  

}