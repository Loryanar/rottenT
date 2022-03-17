import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
   tok:AuthService;
  resultado: string;
  Form = new FormGroup({
    na: new FormControl('',[Validators.required]),
    nick: new FormControl('',[Validators.maxLength(15)]),
   email: new FormControl('',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]) ),
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
  let toke=this.tok.getToken();
  let p= toke.resultToken;
  console.log(p);  
    fetch('https://rotten-t.herokuapp.com/actualizar',{
      method: 'PUT',
      headers: new Headers({
   
   'Content-Type': 'application/json',
   'authorization': 'Bearer'
   
    }),
      body: JSON.stringify(
    {
    "nick": this.Form.value.nick,
    "email": this.Form.value.email,
    "fn": this.Form.value.fn,
    "na": this.Form.value.na,

    
    })
    
  }).then(response=>{
    console.log(response);
    if (response.redirected ==false )
    {
      window.location.replace("http://localhost:8100/tabs")
    }
    return response.json()
  }).then(r =>{
    console.log(r);
}).catch(e => console.log(e))
  }
  else{
    this.resultado = "Hay datos inválidos en el formulario";
    console.log(this.Form);
    console.log(this.resultado)}
  }
 
  
  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}
