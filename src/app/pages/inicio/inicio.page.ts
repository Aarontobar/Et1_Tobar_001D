import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor() { }

  opcion = {
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      spaceBetween: 10,
      //autoplay: true,
  }

  ngOnInit() {
    
  }

  

}
