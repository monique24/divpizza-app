import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.page.html',
  styleUrls: ['./edit-pizza.page.scss'],
})
export class EditPizzaPage {

  nomePizza: String = ""
  descricaoPizza: String = ""
  precoPizza: String = ""
  idPizza: String = ""

  constructor(private activedRoute: ActivatedRoute, private toast: ToastController, private nav: NavController) { }

  ionViewDidEnter() {
    this.idPizza = this.activedRoute.snapshot.params.id
    this.recuperarPizza(this.idPizza)
  }
  recuperarPizza(idPizza) {
    console.log(idPizza)
    let pizzaString = localStorage.getItem(idPizza)
    let pizzaObjeto = JSON.parse(pizzaString)
    console.log(pizzaObjeto)

    this.nomePizza = pizzaObjeto.nomePizza
    this.descricaoPizza = pizzaObjeto.descricaoPizza
    this.precoPizza = pizzaObjeto.precoPizza
  }
  editar(form) {
    let dadosPizza = form.value
    dadosPizza.id = this.idPizza
    let dadosString = JSON.stringify(dadosPizza)
    localStorage.setItem(this.idPizza.toString(), dadosString)
  }

toastSucesso() {
  this.toast.create({
    message: 'Pizza cadastrada com sucesso.',
    duration: 2000,
    color: 'dark'
  }).then(toast => {
    toast.present()
  })
}
}
