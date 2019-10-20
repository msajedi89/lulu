import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../network-engine.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const TEACHERID = 'teacherid';
const USERID = 'userid';
const WHOIS = 'whois';
const LANGUAGE = 'language';
const PARENT = 'parent';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  responseTxt: any = '';
  canProceed: any[];

  user: any = '';
  whoIs = 'student';

  language = 'english';

  constructor(public navCtrl: NavController, public network: NetworkEngineService, private storage: Storage,
    private authService: AuthenticationService, private router: Router, public plt: Platform) {

  }

  segmentChanged(ev: any, value) {
    console.log('Segment changed', value);
  }

  segment1ButtonClicked($event) {
    this.language = 'english';
    console.log('language changed to: ' + this.language);
  }

  segment2ButtonClicked($event) {
    this.language = 'arabic';
    console.log('language changed to: ' + this.language);
  }

  segmentChangedtoStudent($event) {
    this.whoIs = 'student';
    console.log('the whoIs: ' + this.whoIs);
  }

  segmentChangedtoParent($event) {
    this.whoIs = 'parent';
    console.log('the whoIs: ' + this.whoIs);
  }

  segmentChangedtoTeacher($event) {
    this.whoIs = 'teacher';
    console.log('the whoIs: ' + this.whoIs);
  }

  login(username, userpass) {

    this.storage.set(LANGUAGE, this.language);

    this.network.readTable(username, userpass, this.whoIs).then(data => {

      let jsonArray = data;
      this.user = jsonArray[0];
      console.log('I Received user: ' + JSON.stringify(this.user));

      if (this.user != '0') {
        console.log('Who IS: ' + this.whoIs);

        if (this.user.Pass == userpass) {
          if (this.whoIs == 'teacher') {
            console.log('the TeacherID is: ' + this.user.TeacherID);
            this.storage.set(TEACHERID, this.user.TeacherID).then(() => {
              this.storage.set(WHOIS, 'teacher').then(() => {
                this.responseTxt = '';
                this.router.navigate(['members', 'teacherdash']);
              });
            });
            
          } else if (this.whoIs == 'student') {
            console.log('the StudentID is: ' + this.user.stID);
            this.storage.set(USERID, this.user.stID).then(() => {
              this.storage.set(WHOIS, 'student').then(() => {
                this.responseTxt = '';
                this.router.navigate(['members', 'dashboard']);
              });
            });
            
          } else if (this.whoIs == 'parent') {
            console.log('the ParentID is: ' + this.user.ParentID);
            this.storage.set(PARENT, this.user).then(() => {
              this.storage.set(WHOIS, 'parent').then(() => {
                this.responseTxt = '';
                this.router.navigate(['parentdash']);
              });
            });
            
          }
          //this.authService.login(username, this.whoIs);
        } else {
          this.responseTxt = 'The Password is Incorrect';
        }
      } else {
        this.responseTxt = 'The Username is Incorrect';
      }
    });
  }

  showData(data) {
    let jsonArray = data;

    this.canProceed = [];

    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.canProceed.push(jsonObject);
    }

  }

  changeWhoIsToStudent() {
    this.whoIs = 'student';
    console.log('the whoIs: ' + this.whoIs);
  }

  changeWhoIsToTeacher() {
    this.whoIs = 'teacher';
    console.log('the whoIs: ' + this.whoIs);
  }

}
