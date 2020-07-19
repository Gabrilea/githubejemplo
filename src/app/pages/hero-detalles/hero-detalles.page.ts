import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/hero.interface';
import { HerosServiceService } from '../../services/heros-service.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-hero-detalles',
  templateUrl: './hero-detalles.page.html',
  styleUrls: ['./hero-detalles.page.scss'],
})
export class HeroDetallesPage implements OnInit {

  heroe: Heroe = {
    nombre:'',
    alterego:'',
    edad:'0',
    nivel:'',
    vivomuerto:''

  } 

   heroeid= null;
  constructor(private router:ActivatedRoute, private nav: NavController,private heroServe:HerosServiceService, private toastic: ToastController,
   private  aletctrl: AlertController) {}

  ngOnInit() {
    this.heroeid= this.router.snapshot.params['id'];
    if(this.heroeid){
      this.loadHero();
    }
  }
  async guardarHeroe() {
    if(this.heroeid){
      this.heroServe.updateHero(this.heroe, this.heroeid).then(()=> {
        this.nav.navigateForward('/');
      })
    }
    const toast = await this.toastic.create({
  message: 'Guardado',
  position: 'top',
  duration: 1500
    });
    this.heroServe.addHero(this.heroe).then(()=>{
    toast.present();
    this.nav.navigateForward('/');
    toast.present();
    });
      }
      loadHero(){
        this.heroServe.getHeroe(this.heroeid).subscribe(res => {
          console.log(res);
          this.heroe = res;
        });
      }
      async remove(idheroe: string, contenido?:string){
        const alert = await this.aletctrl.create({
          header: 'Seguro que deseas eliminar!',
          message: 'superheroe',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Eliminar',
              cssClass: 'danger',
              handler: () => {
                this.heroServe.deleteHero(idheroe);
                //toast.present();
                this.nav.navigateForward('/');
    
    
              }
            }
          ]
        });
        await alert.present();
      }
}
