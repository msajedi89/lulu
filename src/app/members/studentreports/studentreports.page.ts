import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const LANGUAGE = 'language';

@Component({
  selector: 'app-studentreports',
  templateUrl: './studentreports.page.html',
  styleUrls: ['./studentreports.page.scss'],
})
export class StudentreportsPage implements OnInit {

  language = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }

  goToCheckExamProgress() {
    this.router.navigate(['members', 'reportexamprogress']);
  }

}
