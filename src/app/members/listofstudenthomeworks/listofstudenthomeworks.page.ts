import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTHOMEWORKID = 'homeworkid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-listofstudenthomeworks',
  templateUrl: './listofstudenthomeworks.page.html',
  styleUrls: ['./listofstudenthomeworks.page.scss'],
})
export class ListofstudenthomeworksPage implements OnInit {

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
      this.network.getHomeworksList(this.studentID).then(homeworkData => {
        this.homeworkList = homeworkData;
        console.log('I received Exams: ' + JSON.stringify(this.homeworkList));

        if (this.homeworkList == '0 result') {
          alert('There is no New Exercise for you!');
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }

  goToStudentHomework(hwkID, hasCompleted) {
    this.network.updateStudentHomework(hwkID, 1, 1, hasCompleted).then(() => {
      this.storage.set(STUDENTHOMEWORKID, hwkID).then(result => {
        console.log('the hwkID for next page: ' + result);
        this.router.navigate(['members', 'studenthomeworkquestionslist']);
      });
    });
  }

}
