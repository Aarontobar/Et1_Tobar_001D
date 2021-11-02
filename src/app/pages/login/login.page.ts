import { Component, OnInit } from '@angular/core';
import {ServicesdatosService ,Datos} from 'src/app/services/servicesdatos.service';
import {Platform, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  cuenta:any={
    usuario:"",
    password: ""
  };

  field: string;

  constructor(private storageService: ServicesdatosService, private plt: Platform, private toastController: ToastController, private router: Router, private storage: Storage, public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.verificado();
  }

  verificado(){
    
  }

  ingresar(){
    if(this.validateModel(this.cuenta)){
      this.authenticationService.login(this.cuenta);
    }
  }

  validateModel(model: any){
    for(var [key, value] of Object.entries(model)){
      if(value==""){
        this.field=key;
        return false;
      }
    }
    return true;
  }

}
