import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

export interface Datos{
  id: number,
  usuario: string,
  nombre: string,
  apellido: string,
  correo: string,
  contrasenna: string,
  modified: number,
  active: number
}

const ITEMS_KEY = 'my-datos';

@Injectable({
  providedIn: 'root'
})
export class ServicesdatosService {

  private _storage : Storage; 

  constructor(private Storage:Storage) {
    this.init();
  }

  async init(){
    const storage = await this.Storage.create();
    this._storage = storage;
  }

  addDatos(dato: Datos): Promise<any>{
    return this.Storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (datos) {
        datos.push(dato);
        return this.Storage.set(ITEMS_KEY, datos);
      }else {
        return this.Storage.set(ITEMS_KEY, [dato]);
      }
    })
  }

  getDatos(): Promise<Datos[]>{
    return this.Storage.get(ITEMS_KEY);
  }

  updateDatos(dato: Datos): Promise<any>{
    return this.Storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: Datos[] = [];
      for (let i of datos){
        if (i.id === dato.id){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.Storage.set(ITEMS_KEY, newDato);
    });
  }

  deleteDatos(id: number): Promise<Datos>{
    return this.Storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length === 0){
        return null;
      }
      let toKeep: Datos[] = []; 
      for (let i of datos){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.Storage.set(ITEMS_KEY, toKeep);
    });
  }

  sesionActive(){
    return this.Storage.get(ITEMS_KEY).then((datos: Datos[])=>{
      if(!datos || datos.length === 0){
        return null;
      }
      for(let i of datos){
        if(i.active === 1){
          return i;
        }
      }
    })
  }

  getSesionData(sesion: any){
    return this.Storage.get(ITEMS_KEY).then((datos: Datos[])=>{
      if(!datos || datos.length === 0){
        console.log(datos);
        return null;
      }
      for( let i of datos){
        console.log(i);
        console.log(sesion.usuario);
        if(i.usuario === sesion.usuario && i.contrasenna === sesion.password){
          return i;
        }
      }
    })
  }
}
