import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTEXAMID = 'examid';

@Component({
  selector: 'app-listofstudentexams',
  templateUrl: './listofstudentexams.page.html',
  styleUrls: ['./listofstudentexams.page.scss'],
})
export class ListofstudentexamsPage implements OnInit {

  studentID = '';
  examList: any = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.storage.get(USERID).then(userID => {
      this.studentID = userID;

      // get the student's Exams List
      this.network.getExamsList(this.studentID).then(examData => {
        this.examList = examData;
        console.log('I received Exams: ' + JSON.stringify(this.examList));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'dashboard']);
  }

  goToStudentExam(stExamID, hasCompleted) {
    this.network.updateStudentExam(stExamID, 1, 1, hasCompleted).then(() => {
      this.storage.set(STUDENTEXAMID, stExamID).then(result => {
        console.log('the ExamID for next page: ' + result);
        this.router.navigate(['members', 'studentexamquestionslist']);
      });
    });
  }

}
