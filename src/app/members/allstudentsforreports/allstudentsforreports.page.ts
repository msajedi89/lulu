import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const STIDFORREPORTS = 'stidforreports';

@Component({
  selector: 'app-allstudentsforreports',
  templateUrl: './allstudentsforreports.page.html',
  styleUrls: ['./allstudentsforreports.page.scss'],
})
export class AllstudentsforreportsPage implements OnInit {

  allStudents: any;
  mySearch: string = "";

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {
    
    // get the list of all Students
    this.network.getAllStudentsForManaging().then(data => {
      this.allStudents = data;
      console.log('the allStudents: ' + JSON.stringify(this.allStudents));
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


  showStudentReports(stID) {
    this.storage.set(STIDFORREPORTS, stID).then(() => {
      this.router.navigate(['members', 'studentreports']);
    });
  }

}
