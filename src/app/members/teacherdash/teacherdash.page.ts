import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const ROOT = 'questionroot';

const TEACHERID = 'teacherid';

@Component({
  selector: 'app-teacherdash',
  templateUrl: './teacherdash.page.html',
  styleUrls: ['./teacherdash.page.scss'],
})
export class TeacherdashPage implements OnInit {

  teacherID = '';
  teacher: any = '';
  profileImg = '../../../assets/imgs/default-user.jpg';

  myColor1 = '#fff';
  myColor2 = '#fff';
  myColor3 = '#fff';
  myColor4 = '#fff';
  myColor5 = '#fff';
  myColor6 = '#fff';
  myColor7 = '#fff';
  myColor8 = '#fff';
  myColor9 = '#fff';
  myColor10 = '#fff';
  myColor11 = '#fff';
  myColor12 = '#fff';

  constructor(private router: Router, public navCtrl: NavController, public storage: Storage, private authService: AuthenticationService,
    private network: NetworkEngineService) {
  }

  ngOnInit() {

    this.storage.get(TEACHERID).then(userID => {
      this.teacherID = userID;
      console.log('the teacherID: ' + this.teacherID);

      this.network.getTeacherByID(this.teacherID).then(teacherData => {
        const jsonArray = teacherData;
        this.teacher = jsonArray[0];
        console.log('the teacher: ' + JSON.stringify(this.teacher));

        if (this.teacher.ProfileImg == '') {
          this.profileImg = '../../../assets/imgs/default-user.jpg';
        } else if (this.teacher.ProfileImg == null) {
          this.profileImg = '../../../assets/imgs/default-user.jpg';
        } else {
          this.profileImg = this.network.mainTeacherProfileImgURL + this.teacher.ProfileImg;
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  goToQuestions() {
    this.myColor1 = '#0fadf0';
    setInterval(() => {
      this.myColor1 = '#fff';
    }, 200);
    this.router.navigate(['members', 'questions']);
  }

  gotoLectern() {
    this.router.navigate(['members', 'questions']);
  }

  goToMakingExam() {
    this.myColor3 = '#0fadf0';
    setInterval(() => {
      this.myColor3 = '#fff';
    }, 200);
    this.router.navigate(['members', 'makingexam']);
  }

  goToMakingHomework() {
    this.myColor2 = '#0fadf0';
    setInterval(() => {
      this.myColor2 = '#fff';
    }, 200);
    this.router.navigate(['members', 'makinghomework']);
  }

  goToHomework() {
    this.myColor9 = '#0fadf0';
    setInterval(() => {
      this.myColor9 = '#fff';
    }, 200);
    this.router.navigate(['members', 'homeworkslist']);
  }

  goToStudentsList(fromWhere) {
    if (fromWhere == 'homework') {
      this.myColor4 = '#0fadf0';
      setInterval(() => {
        this.myColor4 = '#fff';
      }, 200);
    } else if (fromWhere == 'exam') {
      this.myColor5 = '#0fadf0';
      setInterval(() => {
        this.myColor5 = '#fff';
      }, 200);
    }
    // determines for the next pages for rooting and where to go and come back
    this.storage.set(ROOT, fromWhere).then(() => {
      this.router.navigate(['members', 'studentsexam']);
    });
  }

  goToManageTitles() {
    this.myColor7 = '#0fadf0';
    setInterval(() => {
      this.myColor7 = '#fff';
    }, 200);
    this.router.navigate(['members', 'managetitles']);
  }

  goToManageStudents() {
    this.myColor6 = '#0fadf0';
    setInterval(() => {
      this.myColor6 = '#fff';
    }, 200);
    this.router.navigate(['members', 'managestudents']);
  }

  goToEditProfile() {
    this.myColor8 = '#0fadf0';
    setInterval(() => {
      this.myColor8 = '#fff';
    }, 200);
    this.router.navigate(['members', 'editteacherprofile']);
  }

  goToReports() {
    this.myColor10 = '#0fadf0';
    setInterval(() => {
      this.myColor10 = '#fff';
    }, 200);
    this.router.navigate(['members', 'allstudentsforreports']);
  }

  goToLecterns() {
    this.myColor11 = '#0fadf0';
    setInterval(() => {
      this.myColor11 = '#fff';
    }, 200);
    this.router.navigate(['lecternmainpage']);
  }

  goToManageParents() {
    this.myColor12 = '#0fadf0';
    setInterval(() => {
      this.myColor12 = '#fff';
    }, 200);
    this.router.navigate(['manageparents']);
  }

}
