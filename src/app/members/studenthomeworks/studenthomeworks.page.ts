import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTHOMEID = 'homeid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-studenthomeworks',
  templateUrl: './studenthomeworks.page.html',
  styleUrls: ['./studenthomeworks.page.scss'],
})
export class StudenthomeworksPage implements OnInit {

  studentID = '';
  homeworkList: any = '';

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

    this.storage.get(USERID).then(userID => {
      this.studentID = userID;

      // get the student's Homeworks List
      this.network.getStudentHomeworks(this.studentID).then(homeworkData => {
        this.homeworkList = homeworkData;
        console.log('I received homeworkList: ' + JSON.stringify(this.homeworkList));
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }


  showDetails(homeID, hasSeen) {
    if (hasSeen == false) {
      this.network.updateHasSeenHomework(homeID).then(resultData => {
        console.log('the result of Updating: ' + JSON.stringify(resultData));
        this.storage.set(STUDENTHOMEID, homeID).then(result => {
          console.log('the homeID for next page: ' + result);
          this.router.navigate(['members', 'studenthomeworkdetails']);
        });
      });
    } else {
      this.storage.set(STUDENTHOMEID, homeID).then(result => {
        console.log('the homeID for next page: ' + result);
        this.router.navigate(['members', 'studenthomeworkdetails']);
      });
    }
  }

}
