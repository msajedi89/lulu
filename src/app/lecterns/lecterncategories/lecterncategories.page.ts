import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LANGUAGE = 'language';
const WHOIS = 'whois';
const LECTERNVIDEOCATEGORY = 'lecternvideocategory';

@Component({
  selector: 'app-lecterncategories',
  templateUrl: './lecterncategories.page.html',
  styleUrls: ['./lecterncategories.page.scss'],
})
export class LecterncategoriesPage implements OnInit {

  lecternVideoCategories: any = '';

  // Settings variables
  language = '';
  whoIs = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage,
    private network: NetworkEngineService) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });

    // get the WhoIs from storage
    this.storage.get(WHOIS).then(resultWhoIs => {
      this.whoIs = resultWhoIs;
      console.log('Who is in this page: ' + this.whoIs);
    });
  }

  ngOnInit() {

    // get the Lectern Categories for showing Videos in next page
    this.network.getLecternVideoCategories().then(resultData => {
      this.lecternVideoCategories = resultData;
      console.log('the lecternVideoCategories is: ' + JSON.stringify(this.lecternVideoCategories));
    }).catch(err => {
      alert(err);
    });
  }

  goBack() {
    if (this.whoIs == 'teacher') {
      this.router.navigate(['lecternmainpage']);
    } else {
      this.router.navigate(['members', 'dashboard']);
    }
  }

  goToCategoryList(category) {
    this.storage.set(LECTERNVIDEOCATEGORY, category).then(() => {
      this.router.navigate(['lecterncategoryvideos']);
    });
  }

}
