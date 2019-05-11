import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const USERID = 'userid';
const STUDENTHOMEWORKID = 'homeworkid';

@Component({
  selector: 'app-listofstudenthomeworks',
  templateUrl: './listofstudenthomeworks.page.html',
  styleUrls: ['./listofstudenthomeworks.page.scss'],
})
export class ListofstudenthomeworksPage implements OnInit {

  studentID = '';
  homeworkList: any = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.storage.get(USERID).then(userID => {
      this.studentID = userID;

      // get the student's Homeworks List
      this.network.getHomeworksList(this.studentID).then(homeworkData => {
        this.homeworkList = homeworkData;
        console.log('I received Exams: ' + JSON.stringify(this.homeworkList));
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
