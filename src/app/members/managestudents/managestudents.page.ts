import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const STUDENTID = 'studentid';
const FORADDOREDIT = 'addoreditstudent';

@Component({
  selector: 'app-managestudents',
  templateUrl: './managestudents.page.html',
  styleUrls: ['./managestudents.page.scss'],
})
export class ManagestudentsPage implements OnInit {

  allStudents: any;
  mySearch: string = "";

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get the list of all Students
      this.network.getAllStudentsForManaging().then(data => {
        this.allStudents = data;
        console.log('the allStudents: ' + JSON.stringify(this.allStudents));
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }

  // Filter Students
  updateStudents(){
    if(this.mySearch != '') {
      console.log('my Search: ' + this.mySearch);
      this.network.filterStudentsForManaging(this.mySearch).then(data => {
        console.log('I recieved Students: ' + JSON.stringify(data));
        this.allStudents = data;
      });
    } else {
      this.network.getAllStudentsForManaging().then(data => {
        console.log('I recieved Students: ' + JSON.stringify(data));
        this.allStudents = data;
      });
    }
  }

  showStudentDetails(studentID) {
    this.storage.set(FORADDOREDIT, 'edit').then(() => {
      this.storage.set(STUDENTID, studentID).then(result => {
        console.log('the result of storage: ' + result);
        this.router.navigate(['members', 'edituser']);
      });
    });
  }

  goToAddStudent() {
    this.storage.set(FORADDOREDIT, 'add').then(() => {
      this.router.navigate(['members', 'edituser']);
    });
  }

}
