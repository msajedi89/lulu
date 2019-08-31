import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const MAINTITLE = 'maintitleid';
const SUBTITLE = 'subtitleid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-lecternsubtitlepage',
  templateUrl: './lecternsubtitlepage.page.html',
  styleUrls: ['./lecternsubtitlepage.page.scss'],
})
export class LecternsubtitlepagePage implements OnInit {

  subTitles: any = '';
  mainTitle: any = '';

  language = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    this.storage.get(MAINTITLE).then(mtID => {
      // get Chosen Main Title by its ID
      this.network.getMainTitleByID(mtID).then(maintitleData => {
        const jsonArray = maintitleData;
        this.mainTitle = jsonArray[0];
        console.log('the maintitle is: ' + JSON.stringify(this.mainTitle));
      });

      // get Sub Title
      this.network.getSubTitles(mtID).then(subTitleData => {
        this.subTitles = subTitleData;
        console.log('the subTitles: ' + JSON.stringify(this.subTitles));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'lecternmaintitlepage']);
  }

  goToSubTitle(subTID) {
    this.storage.set(SUBTITLE, subTID).then(() => {
      console.log('the subTID for Next Page: ' + subTID);
      this.router.navigate(['members', 'lecternquestionspage']);
    });
  }

}
