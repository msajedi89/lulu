import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LANGUAGE = 'language';
const WHOIS = 'whois';
const LECTERNVIDEOCATEGORY = 'lecternvideocategory';
const LECTERNVIDEOIDFORADD = 'lecternvideoidforadd';
const FROMWHEREINLECTERNVIDEOS = 'fromwhere';
const LECTERNVIDEOIDFORSTUDENTWATCHING = 'lecternvideoidstudentwatch';

@Component({
  selector: 'app-lecterncategoryvideos',
  templateUrl: './lecterncategoryvideos.page.html',
  styleUrls: ['./lecterncategoryvideos.page.scss'],
})
export class LecterncategoryvideosPage implements OnInit {

  category = '';
  lecternVideos: any = '';

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

    this.storage.get(LECTERNVIDEOCATEGORY).then(categoryResult => {
      this.category = categoryResult;
      console.log('the category to fetch its Videos: ' + this.category);

      // get the Lectern Categories for showing Videos in next page
      this.network.getLecternVideoByCategory(this.category).then(resultData => {
        this.lecternVideos = resultData;
        console.log('the lecternVideos is: ' + JSON.stringify(this.lecternVideos));
      }).catch(err => {
        alert(err);
      });
    });
  }

  goBack() {
    this.router.navigate(['lecterncategories']);
  }

  goToLecternVideo(videoID) {
    if (this.whoIs == 'teacher') {
      this.storage.set(LECTERNVIDEOIDFORADD, videoID).then(() => {
        this.storage.set(FROMWHEREINLECTERNVIDEOS, 'lecterncategoryvideos').then(() => {
          this.router.navigate(['addvideoquestions']);
        });
      });
    } else {
      this.storage.set(LECTERNVIDEOIDFORSTUDENTWATCHING, videoID).then(() => {
        this.router.navigate(['studentwatchvideo']);
      });
    }
  }

}
