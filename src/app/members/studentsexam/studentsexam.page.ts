import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const studentKey = 'student';
const ROOT = 'questionroot';

@Component({
  selector: 'app-studentsexam',
  templateUrl: './studentsexam.page.html',
  styleUrls: ['./studentsexam.page.scss'],
})

export class StudentsexamPage implements OnInit {


  allStudents: any;
  mySearch: string = "";

  // the variable for Rooting
  fromWhere: any;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) {

      this.storage.get(ROOT).then(fromwhereResult => {
        this.fromWhere = fromwhereResult;
        console.log('the root is: ' + this.fromWhere);
      });
     }

  ngOnInit() {

    this.platform.ready().then(() => {
      
      // get the list of all Students 
      this.network.getAllStudents().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.allStudents = data;
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }

  // Filter Students
  updateStudents(){
    if(this.mySearch != ""){
      console.log('my Search: ' + this.mySearch);
      this.network.filterStudents(this.mySearch).then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.allStudents = data;
      });
    } else {
      this.network.getAllStudents().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.allStudents = data;
      });
    }
  }

  showStudentDetails(studentID){
    this.storage.set(studentKey, studentID).then(result => {
      console.log('the result of storage: ' + result);
      if (this.fromWhere == 'exam') {
        this.router.navigate(['members', 'studentsexamlist']);
      } else {
        this.router.navigate(['members', 'studentshomeworklist']);
      }
    });
  }

}
