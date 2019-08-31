import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-reportexamprogress',
  templateUrl: './reportexamprogress.page.html',
  styleUrls: ['./reportexamprogress.page.scss'],
})
export class ReportexamprogressPage implements OnInit {

  studentID = '';
  examsList: any = '';

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
      this.network.reportStudentExamProgress(this.studentID).then(examsData => {
        this.examsList = examsData;
        console.log('I received Exams: ' + JSON.stringify(this.examsList));

        if (this.examsList == '0 result') {
          console.log('There is no exam!');
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'studentreports']);
  }

  goToExamQuestions(stExamID) {
    this.storage.set(STUDENTEXAMID, stExamID).then(() => {
      this.router.navigate(['members', 'studenttakenexamquestionlist']);
    });
  }

}
