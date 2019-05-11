import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const MAINTITLE = 'maintitleid';

@Component({
  selector: 'app-lecternmaintitlepage',
  templateUrl: './lecternmaintitlepage.page.html',
  styleUrls: ['./lecternmaintitlepage.page.scss'],
})
export class LecternmaintitlepagePage implements OnInit {

  mainTitles: any = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.network.getMainTitles().then(maintitlesData => {
        this.mainTitles = maintitlesData;
        console.log('the mainTitles: ' + JSON.stringify(this.mainTitles));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }

  goToMainTitle(mtID) {
    this.storage.set(MAINTITLE, mtID).then(() => {
      console.log('the mtID is: ' + mtID);
      this.router.navigate(['members', 'lecternsubtitlepage']);
    });
  }

}
