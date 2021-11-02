import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RespuestaToHeadLines} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private httpclient: HttpClient) { }

  getTopHeadLines(pagina: string){
    return this.httpclient.get<RespuestaToHeadLines>(
      pagina
    )
  }
}
