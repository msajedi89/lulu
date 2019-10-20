import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const PARENT = 'parent';
const LANGUAGE = 'language';
const STUDENTINPARENTDASH = 'studentinparentdash';
const STIDFORREPORTS = 'stidforreports';
const USERID = 'userid';

@Component({
  selector: 'app-viewstudents',
  templateUrl: './viewstudents.page.html',
  styleUrls: ['./viewstudents.page.scss'],
})
export class ViewstudentsPage implements OnInit {

  parentID = '';
  parent: any = '';

  student: any = '';
  stID = '';
  studentProfileImgPath = '';
  profileImgUrl = '';

  language = '';

  newExamsCount: any = '';
  newHomeworksCount: any = '';

  constructor(private router: Router, private storage: Storage, private network: NetworkEngineService) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get the Student Profile Image Path
    this.studentProfileImgPath = this.network.mainStudentsProfileImgUrl;

    // get the Chosen Student info
    this.storage.get(STUDENTINPARENTDASH).then(studentInfo => {
      this.student = studentInfo;
      console.log('the student Chosen: ' + JSON.stringify(this.student));
      this.stID = this.student.stID;
      console.log('the stID is: ' + this.stID);

      this.profileImgUrl = this.studentProfileImgPath + this.student.ProfileImg;

      // get the New Exams Count
      this.network.countNewExams(this.stID).then(newExamsCountResult => {
        const jsonArray = newExamsCountResult;
        this.newExamsCount = jsonArray[0];
        console.log('the newExamsCount: ' + this.newExamsCount.NewExams);
      }).catch(err => {
        alert(err);
      });

      // get the New Homeworks Count
      this.network.countNewHomeworks(this.stID).then(newHomeworksCountResult => {
        const jsonArray1 = newHomeworksCountResult;
        this.newHomeworksCount = jsonArray1[0];
        console.log('the newHomeworksCount: ' + this.newHomeworksCount.NewHomeworks);
      }).catch(err => {
        alert(err);
      });
    });
  }

  goBack() {
    this.router.navigate(['parentdash']);
  }

  goToReports() {
    this.storage.set(STIDFORREPORTS, this.stID).then(() => {
      this.router.navigate(['members', 'studentreports']);
    });
  }

  goToListOfTakenExam() {
    this.storage.set(USERID, this.stID).then(() => {
      this.router.navigate(['members', 'listofstudentstakenexam']);
    });
  }

  goToListOfHomeworks() {
    this.storage.set(USERID, this.stID).then(() => {
      this.router.navigate(['members', 'studenthomeworks']);
    });
  }

  viewNewExams() {
    this.storage.set(USERID, this.stID).then(() => {
      this.router.navigate(['members', 'listofstudentexams']);
    });
  }

  viewNewHomeworks() {
    this.storage.set(USERID, this.stID).then(() => {
      this.router.navigate(['members', 'studenthomeworks']);
    });
  }

}
