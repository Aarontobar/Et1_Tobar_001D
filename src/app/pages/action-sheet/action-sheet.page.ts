import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  usuario = {
    nombre:'',
    apellido:'',
    email:'',
    password:''
  }

  constructor() {}

  ngOnInit() {
    
  }

  onSubmit(){
    console.log('submit');
    console.log(this.usuario);
  }

}
