import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Datos } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{}

  @ViewChild('myList')myList :IonList;

  constructor(private storageService: ServicesdatosService, private plt: Platform, private toastController: ToastController, private router: Router) {
    this.plt.ready().then(()=>{
      this.loadDatos();
    });
  }

  ngOnInit() {
  }

  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    });
  }

  addDatos(){
    this.newDato.modified = Date.now();
    this.newDato.id = Date.now();
    this.newDato.active= 0;
    if (this.datos){
      for (let i of this.datos ){
        if (i.usuario === this.newDato.usuario){
          this.showToast('!Nombre de usuario ocupado')
          return null;
        }
      }
    }
    this.storageService.addDatos(this.newDato).then(dato=>{
      this.newDato = <Datos>{};
      this.showToast('!Datos Agregados');
      this.loadDatos();
      this.router.navigate(["/login"]);
    });
  }

  updateDatos(dato: Datos ){
    dato.nombre = `UPDATED: ${dato.nombre}`;
    dato.modified = Date.now();
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Elemento actualizado!')
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  deleteDatos(dato: Datos){
    this.storageService.deleteDatos(dato.id).then(item=>{
      this.showToast('Elemento eliminado');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
