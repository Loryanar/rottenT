import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  resultado: string;
  Form = new FormGroup({
    na: new FormControl('',[Validators.required]),
    nick: new FormControl('',[Validators.maxLength(15)]),
   email: new FormControl('',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]) ),
   password: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(15)])),
   fn: new FormControl('',[Validators.required]),
   
   });
  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.Form.valid){
    this.resultado = "Todos los datos son válidos";
    console.log(this.resultado);
   
    fetch('https://restapi-mr.herokuapp.com/registro',{
      method: 'POST',
      headers: new Headers({
   
   'Content-Type': 'application/json'
    }),
      body: JSON.stringify(
    {
    "nick": this.Form.value.nick,
    "email": this.Form.value.email,
    "fn": this.Form.value.fn,
    "na": this.Form.value.na,
    "contrasena": this.Form.value.password,
    
    })
    
  }).then(response=>{
    console.log(response);
    if (response.redirected ==false )
    {
      window.location.replace("http://localhost:8102/tabs")
    }
    return response.json()
  }).then(r =>{
    console.log(r);
}).catch(e => console.log(e))
  }
  else{
    this.resultado = "Hay datos inválidos en el formulario";
    console.log(this.resultado)}
  }
 
  
  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}