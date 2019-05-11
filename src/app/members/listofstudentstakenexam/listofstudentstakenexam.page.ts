import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTEXAMID = 'examid';

@Component({
  selector: 'app-listofstudentstakenexam',
  templateUrl: './listofstudentstakenexam.page.html',
  styleUrls: ['./listofstudentstakenexam.page.scss'],
})
export class ListofstudentstakenexamPage implements OnInit {

  studentID = '';
  examList: any = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.storage.get(USERID).then(userID => {
      this.studentID = userID;

      // get the student's Exams List
      this.network.getStudentTakenExamsList(this.studentID).then(examData => {
        this.examList = examData;
        console.log('I received Exams: ' + JSON.stringify(this.examList));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }

  goToStudentExam(stExamID) {
    this.storage.set(STUDENTEXAMID, stExamID).then(result => {
      console.log('the stExamID for next page: ' + result);
      this.router.navigate(['members', 'studenttakenexamquestionlist']);
    });
  }

}
