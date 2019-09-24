import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComprarPizzaPage } from './comprar-pizza.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarPizzaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComprarPizzaPage]
})
export class ComprarPizzaPageModule {
  idPizza;
  constructor(private activatedRoute:ActivatedRoute){}
  ngOnInit(){}
  ionViewDidEnter(){
    this.idPizza=   this.activatedRoute.snapshot.params.id
  }
}
