import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const USERID = 'userid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  studentID = '';
  student: any = '';
  profileImg = '';
  myColor1 = '#fff';
  myColor2 = '#fff';
  myColor3 = '#fff';
  myColor4 = '#fff';
  myColor5 = '#fff';
  myColor6 = '#fff';
  myColor7 = '#fff';
  myColor8 = '#fff';

  language = '';

// tslint:disable-next-line: max-line-length
  constructor(private router: Router, private authService: AuthenticationService, private storage: Storage, private network: NetworkEngineService) { 

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {
    this.storage.get(USERID).then(userID => {
      this.studentID = userID;
      console.log('the studentID: ' + this.studentID);

      this.network.getStudentByID(this.studentID).then(studentData => {
        const jsonArray = studentData;
        this.student = jsonArray[0];
        console.log('the Student: ' + JSON.stringify(this.student));

        if (this.student.ProfileImg == '') {
          this.profileImg = '../../../assets/imgs/default-user.jpg';
        } else {
          this.profileImg = this.network.mainStudentsProfileImgUrl + this.student.ProfileImg;
        }
      });
    });

  }

  logout() {
    //this.storage.clear();
    this.authService.logout();
  }

  goToDragDrop() {
    this.router.navigate(['members', 'studentdragdropquestion']);
  }

  goToStudentDragDrop() {
    this.router.navigate(['members', 'studentsdragdrop']);
  }

  goToStudentSelectiveQuestions() {
    this.router.navigate(['members', 'studentselectivequestions']);
  }

  goToStudentDragToTableQuestion() {
    this.router.navigate(['members', 'studentsdragtotablequestion']);
  }

  goToStudentDrawingQuestion() {
    this.router.navigate(['members', 'studentdrawingquestion']);
  }

  goToStudentDescriptiveQuestion() {
    this.router.navigate(['members', 'studentdescriptivequestion']);
  }

  goToStudentReciteQuran() {
    this.router.navigate(['members', 'studentrecitequran']);
  }

  goToExamsList() {
    this.myColor1 = '#0fadf0';
    setInterval(() => {
      this.myColor1 = '#fff';
    }, 200);
    this.router.navigate(['members', 'listofstudentexams']);
    
  }

  goToHomeworksList() {
    this.myColor2 = '#0fadf0';
    setInterval(() => {
      this.myColor2 = '#fff';
    }, 200);
    this.router.navigate(['members', 'listofstudenthomeworks']);
  }

  goToHomeworks() {
    this.myColor7 = '#0fadf0';
    setInterval(() => {
      this.myColor7 = '#fff';
    }, 200);
    this.router.navigate(['members', 'studenthomeworks']);
  }

  goToListOfTakenExam() {
    this.myColor3 = '#0fadf0';
    setInterval(() => {
      this.myColor3 = '#fff';
    }, 200);
    this.router.navigate(['members', 'listofstudentstakenexam']);
  }

  goToListOfTakenHomeworks() {
    this.myColor4 = '#0fadf0';
    setInterval(() => {
      this.myColor4 = '#fff';
    }, 200);
    this.router.navigate(['members', 'listofstudenttakenhomework']);
  }

  goToLecterns() {
    this.myColor5 = '#0fadf0';
    setInterval(() => {
      this.myColor5 = '#fff';
    }, 200);
    this.router.navigate(['members', 'lecternmaintitlepage']);
  }

  goToEditProfile() {
    this.myColor6 = '#0fadf0';
    setInterval(() => {
      this.myColor6 = '#fff';
    }, 200);
    this.router.navigate(['members', 'edituser']);
  }

  goToReports() {
    this.myColor8 = '#0fadf0';
    setInterval(() => {
      this.myColor8 = '#fff';
    }, 200);
    this.router.navigate(['members', 'studentreports']);
  }

}
