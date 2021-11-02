import { Component, OnInit } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  datos: Datos[] = [];
  usuario: Datos = <Datos>{};
  dato: Datos = <Datos>{};

  constructor(private storageService: ServicesdatosService,  private plt: Platform,  private toastController: ToastController,  private router: Router, public authenticationService: AuthenticationService) {
    this.plt.ready().then(()=>{
      this.loadDatos();
    });
  }

  ngOnInit() {
  }

  

  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
      console.log(this.datos);
      this.loadUsuario();
    });
  }
  
  loadUsuario(){
    console.log('cargado');
    console.log(this.datos);
    for(let i of this.datos){
      if(i.active === 1){
        this.usuario= i;
        this.dato= i;
        console.log(i);
      }
    }
  }

  updateDatos(){
    if(this.dato.usuario === this.usuario.usuario){
      this.storageService.updateDatos(this.usuario).then(item=>{
        this.showToast('Elemento actualizado!')
        this.loadDatos();
      });
    }
    else{
      for(let i of this.datos){
        if(i.usuario === this.usuario.usuario){
          this.showToast('nombre de usuario ocupado')
          return null;
        }
        else{
          this.storageService.updateDatos(this.usuario).then(item=>{
          this.showToast('Elemento actualizado!')
          localStorage.setItem('USER_DATA', this.usuario.usuario);
          this.loadDatos();
          });
        }
      }
    }
    
  }

  deleteDatos(){
    this.storageService.deleteDatos(this.usuario.id).then(item=>{
      this.showToast('Elemento eliminado');
      localStorage.removeItem('USER_DATA');
      this.router.navigate(["/login"]);
    });
  }

  
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  logout(){
    this.authenticationService.logout();
  }
}
