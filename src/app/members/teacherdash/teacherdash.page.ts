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
    this.router.navigate(['members', 'questions']);
  }

  gotoLectern() {
    this.router.navigate(['members', 'questions']);
  }

  goToMakingExam() {
    this.router.navigate(['members', 'makingexam']);
  }

  goToMakingHomework() {
    this.router.navigate(['members', 'makinghomework']);
  }

  goToStudentsList(fromWhere) {
    // determines for the next pages for rooting and where to go and come back
    this.storage.set(ROOT, fromWhere).then(() => {
      this.router.navigate(['members', 'studentsexam']);
    });
  }

  goToManageTitles() {
    this.router.navigate(['members', 'managetitles']);
  }

  goToManageStudents() {
    this.router.navigate(['members', 'managestudents']);
  }

  goToEditProfile() {
    this.router.navigate(['members', 'editteacherprofile']);
  }

}
