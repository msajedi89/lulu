import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const LANGUAGE = 'language';
const USERID = 'userid';
const WHOIS = 'whois';
const STIDFORREPORTS = 'stidforreports';
//const PARENT = 'parent';

@Component({
  selector: 'app-studentreports',
  templateUrl: './studentreports.page.html',
  styleUrls: ['./studentreports.page.scss'],
})
export class StudentreportsPage implements OnInit {

  language = '';

  stID = '';
  whoIS = '';

  //parent: any = '';
  //parentID = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get the whoIS
    this.storage.get(WHOIS).then(whoIsResult => {
      this.whoIS = whoIsResult;
      console.log('who is in this page: ' + this.whoIS);

      if(this.whoIS == 'student') {
        this.storage.get(USERID).then(studentIDResult => {
          this.stID = studentIDResult;
        });
      }
      if(this.whoIS == 'parent') {
        this.storage.get(STIDFORREPORTS).then(studentIDResult => {
          this.stID = studentIDResult;
        });
      }
      if(this.whoIS == 'teacher') {
        this.storage.get(STIDFORREPORTS).then(studentIDResult => {
          this.stID = studentIDResult;
        });
      }
    });
  }

  goBack() {
    if(this.whoIS == 'student') {
      this.router.navigate(['members', 'dashboard']);
    } else if(this.whoIS == 'parent') {
      this.router.navigate(['viewstudents']);
    } else if(this.whoIS == 'teacher') {
      this.router.navigate(['members', 'allstudentsforreports']);
    }
  }

  goToCheckExamProgress() {
    this.storage.set(USERID, this.stID).then(() => {
      this.router.navigate(['members', 'reportexamprogress']);
    });
  }

  goToStrongPoints() {
    this.storage.set(STIDFORREPORTS, this.stID).then(() => {
      this.router.navigate(['categoryreportmaintitlespage']);
    });
  }

}
