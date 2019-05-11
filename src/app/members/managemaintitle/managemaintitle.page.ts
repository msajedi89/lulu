import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const MAINTITLE = 'maintitle';
const FORADDOREDIT = 'addoreditmaintitle';

@Component({
  selector: 'app-managemaintitle',
  templateUrl: './managemaintitle.page.html',
  styleUrls: ['./managemaintitle.page.scss'],
})
export class ManagemaintitlePage implements OnInit {

  mainTitles: any = '';
  mySearch = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get the list of all Main Titles
      this.network.getAllMainTitles().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.mainTitles = data;
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'managetitles']);
  }

  // Filter Maintitles
  updateMainTitles() {
    if (this.mySearch != '') {
      console.log('my Search: ' + this.mySearch);
      this.network.filterMainTitles(this.mySearch).then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.mainTitles = data;
      });
    } else {
      this.network.getAllMainTitles().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.mainTitles = data;
      });
    }
  }

  goForEditing(mtID) {
    this.storage.set(FORADDOREDIT, 'edit').then(() => {
      this.storage.set(MAINTITLE, mtID).then(result => {
        console.log('the result of mtID in storage: ' + result);
        this.router.navigate(['members', 'editmaintitle']);
      });
    });
  }

  goToAddMainTitle() {
    this.storage.set(FORADDOREDIT, 'add').then(() => {
      this.router.navigate(['members', 'editmaintitle']);
    });
  }

}
