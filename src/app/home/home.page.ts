import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';  
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menu: ActionSheetController, private alert:AlertController, private route: Router){} 

  descPizza = []
  catalogo: Array<Object> = []

  ionViewDidEnter() {
    this.listarCatalogo()
  }

  listarCatalogo() {
    this.catalogo = []
    const tamanhoDoBanco = localStorage.length
    for (let i = 0; i < tamanhoDoBanco; i++) {
      const chaveAtual = localStorage.key(i)
      const pizzaString = localStorage.getItem(chaveAtual)
      const pizzaObjeto = JSON.parse(pizzaString)
      this.catalogo.push(pizzaObjeto)
    }
  }

  async exibirOps(id, nomePizza) {
    
    const actionSheet = await this.menu.create({
      header: 'Opções',
      buttons: [{
        text: 'Excluir pizza',
        icon: 'trash',
        handler: () => {
          this.exibirAlertaExclusao(id, nomePizza)
        }
      }, {
        text: 'Editar pizza',
        icon: 'create',
        handler: () => {
          this.route.navigate(['edit-pizza',id])
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async exibirAlertaExclusao(id, nomePizza){
    const alertDelete = await this.alert.create({
      header: 'Exclusão de Pizza',
      subHeader: 'Deseja realmente excluir a pizza ' + nomePizza + '?',
      message: '',
      buttons: [{
        text: 'Cancelar',
        handler: function(){
          localStorage.removeItem(id)
          this.listarCatalogo()
        }
      }, {
        text: 'Excluir',
        handler: ()=> {
          localStorage.removeItem(id)
          this.listarCatalogo()
        } 
      }]
    })

    await alertDelete.present()
  }
  comprar(id){
   console.log(id);
   this.route.navigate(['comprar-pizza',id])
  }
}
