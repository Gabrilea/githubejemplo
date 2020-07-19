import { Component } from '@angular/core';
import { HerosServiceService } from '../services/heros-service.service';
import { Heroe } from '../interfaces/hero.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hero: Heroe[]=[];

  constructor(private heroserve:HerosServiceService) {}
  ngOnInit(): void {
    this.heroserve.getAlHeros().subscribe(res => {
      this.hero=res;
      console.log(this.hero)
    });
  }

}
