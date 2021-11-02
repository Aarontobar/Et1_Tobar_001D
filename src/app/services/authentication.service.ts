import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {ServicesdatosService, Datos} from './servicesdatos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  datos: Datos[] = [];

  constructor(private router: Router, private storage: Storage, public datosService: ServicesdatosService, public toastController: ToastController) { 
    this.isLogget();
  }

  isLogget(){
    this.storage.get("USER_DATA").
    then((response)=>{
      console.log(response)
      if(response!=null){
        this.authState.next(true);
        this.router.navigate(['/tabs/inicio'])
      }
    })
  }

  logout(){
    this.storage.get("USER_DATA").then((data)=>{
      data.active=0;
      this.datosService.updateDatos(data)
      .then((response)=>{
        this.storage.remove("USER_DATA");
        this.router.navigate(['login']);
        this.authState.next(false);
      })
      .catch((error)=>console.error(error))
    });
  }

  login(login: any){
    console.log(login);
    this.datosService.getSesionData(login)
    .then((data)=>{
      if(data===undefined){
        console.log(data);
        this.presentToast("credenciales incorrectas");
      }else{
        data.active=1;
        this.datosService.updateDatos(data)
        .then((response)=>{
          this.storage.set("USER_DATA", data);
          this.authState.next(true);
          this.router.navigate(['tabs/inicio']);
        });
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  async presentToast(message: string, duration?:number){
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration?duration: 2000
      }
    );
    toast.present();
  }

  isAuthenticated(){
    return this.authState.value;
  }
}
