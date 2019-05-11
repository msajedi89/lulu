import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const studentKey = 'student';
const STUDENTHOMEWORKID = 'homeworkid';

@Component({
  selector: 'app-studentshomeworklist',
  templateUrl: './studentshomeworklist.page.html',
  styleUrls: ['./studentshomeworklist.page.scss'],
})
export class StudentshomeworklistPage implements OnInit {

  // required variables
  stID: any;
  namefamily: any[];
  profileImg: any[];
  birthdate: any[];
  profileImgUrl = '';
  examList: any;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      // 1-detection of entered student    2-get his/her information
      this.storage.get(studentKey).then(result => {
        this.stID = result;
        console.log('this page recieved stID: ' + this.stID);
        // get the Student
        this.network.getStudentByID(this.stID).then(data => {
          this.showData(data);
          console.log('I recieved this Student: ' + JSON.stringify(data));

          this.profileImgUrl = this.network.mainStudentsProfileImgUrl + this.profileImg;

          // get the list of this Student's Exam
          this.network.getStudentsHomeworksList(this.stID).then(homeworksData => {
            this.examList = homeworksData;
            console.log('the homeworks list: ' + JSON.stringify(this.examList));
          });
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'studentsexam']);
  }

  showData(data){
    let jsonArray = data;

    this.namefamily = [];
    this.profileImg = [];
    this.birthdate = [];

    for(let i=0; i < jsonArray.length; i++){
      let jsonObject = jsonArray[i];
      this.namefamily.push(jsonObject.NameFamily);
      this.profileImg.push(jsonObject.ProfileImg);
      this.birthdate.push(jsonObject.Birthdate);
    }
  }

  // go to Clicked Student Exam
  goToStudentHomework(hwkID){
    this.storage.set(STUDENTHOMEWORKID, hwkID).then(result => {
      console.log('the hwkID for next page: ' + result);
      this.router.navigate(['members', 'homeworkevaluation']);
    });
  }

}
