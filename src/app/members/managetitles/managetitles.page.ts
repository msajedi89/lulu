import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-managetitles',
  templateUrl: './managetitles.page.html',
  styleUrls: ['./managetitles.page.scss'],
})
export class ManagetitlesPage implements OnInit {

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }

  goToManageMainTitles() {
    this.router.navigate(['members', 'managemaintitle']);
  }

  goToManageSubTitles() {
    this.router.navigate(['members', 'managesubtitle']);
  }

}
