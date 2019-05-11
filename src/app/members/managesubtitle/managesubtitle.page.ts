import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const SUBTITLE = 'subtitle';
const FORADDOREDIT = 'addoreditsubtitle';

@Component({
  selector: 'app-managesubtitle',
  templateUrl: './managesubtitle.page.html',
  styleUrls: ['./managesubtitle.page.scss'],
})
export class ManagesubtitlePage implements OnInit {

  subTitles: any = '';
  mySearch = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get the list of all Sub Titles
      this.network.getAllSubTitles().then(data => {
        console.log('I recieved Sub Titles: ' + JSON.stringify(data));
        this.subTitles = data;
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'managetitles']);
  }

  // Filter Maintitles
  updateSubTitles() {
    if (this.mySearch != '') {
      console.log('my Search: ' + this.mySearch);
      this.network.filterSubTitles(this.mySearch).then(data => {
        console.log('I recieved sub Titles: ' + JSON.stringify(data));
        this.subTitles = data;
      });
    } else {
      this.network.getAllSubTitles().then(data => {
        console.log('I recieved sub Titles: ' + JSON.stringify(data));
        this.subTitles = data;
      });
    }
  }

  goForEditing(SubTID) {
    this.storage.set(FORADDOREDIT, 'edit').then(() => {
      this.storage.set(SUBTITLE, SubTID).then(result => {
        console.log('the result of SubTID in storage: ' + result);
        this.router.navigate(['members', 'editsubtitle']);
      });
    });
  }

  goToAddSubTitle() {
    this.storage.set(FORADDOREDIT, 'add').then(() => {
      this.router.navigate(['members', 'editsubtitle']);
    });
  }

}
