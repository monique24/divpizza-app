import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.page.html',
  styleUrls: ['./add-pizza.page.scss'],
})
export class AddPizzaPage implements OnInit {

  constructor(private toast: ToastController, private nav:NavController) { }

  ngOnInit() {}

   toastSucesso() {
    this.toast.create({
      message: 'Pizza cadastrada com sucesso.',
      duration: 2000,
      color: 'dark'
    }).then(toast => {
      toast.present()
    })
  }

   toastErro() {
    this.toast.create({
      message: 'Algum dos campos está vazio, preenchá - os.',
      duration: 2000,
      color: 'dark'
    }).then(toast => {
      toast.present()
    })
  }

  voltarHome(){
    this.nav.back()
  }

  salvar(form) {
    const chavePizza = Math.random() * 999
    const pizzaDados = form.value 
    pizzaDados.id = chavePizza

    if(pizzaDados.nomePizza === "" || pizzaDados.descricaoPizza.length === "" || 
      pizzaDados.precoPizza === "")
    {
      this.toastErro()
    } else
    {
      const pizzaDadosString = JSON.stringify(pizzaDados)
      localStorage.setItem(chavePizza.toString(), pizzaDadosString)
      form.reset()
    
      this.toastSucesso()
      this.voltarHome()
    }
  }

}
