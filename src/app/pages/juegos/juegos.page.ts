import { Component, OnInit } from '@angular/core';
import {JuegosService} from 'src/app/services/juegos.service';
import {result} from '../../interfaces/interfaces';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  juegos: result[] = []
  next: any;
  items:any;
  numero: 1;
  pagina: '&page=';

  constructor(private juegosservice: JuegosService) {
    this.initializeItems();
  }

  ngOnInit() {
    this.juegosservice.getTopHeadLines('https://api.rawg.io/api/games?key=5978e99b33e341c7bfb90c06f873b38b').subscribe(resp=>{
      console.log('juegos', resp);
      this.juegos.push(...resp.results);
      this.next=resp.next;
      console.log(this.next);
      console.log(this.juegos);
    })
  }

  initializeItems(){
    this.items= this.juegos;
  }

  getItems(ev: any){
    this.initializeItems();

    let val = ev.target.value;

    if(val && val.trim() != ''){
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase())> -1);
      })
    }
  }

  nextPage(){
    if(this.next!=null){
      this.juegosservice.getTopHeadLines(this.next).subscribe(resp=>{
        this.juegos.push(...resp.results);
      })
    }
  }
}
