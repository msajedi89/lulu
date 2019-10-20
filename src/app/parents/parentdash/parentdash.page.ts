import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const PARENT = 'parent';
const LANGUAGE = 'language';
const STUDENTINPARENTDASH = 'studentinparentdash';

@Component({
  selector: 'app-parentdash',
  templateUrl: './parentdash.page.html',
  styleUrls: ['./parentdash.page.scss'],
})
export class ParentdashPage implements OnInit {

  parentID = '';
  parent: any = '';

  studentsList: any = '';

  studentProfileImgPath = '';

  language = '';

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

    // get the parent info
    this.storage.get(PARENT).then(parentInfo => {
      this.parent = parentInfo;
      console.log('the Parent Loaded in Dashboard: ' + JSON.stringify(this.parent));
      this.parentID = this.parent.ParentID;
      console.log('the parentID is: ' + this.parentID);

      // get the list of Students of this parent
      this.network.getStudentByParentID(this.parentID).then(studentsData => {
        this.studentsList = studentsData;
        console.log('the list of Students: ' + JSON.stringify(this.studentsList));
      }).catch(error => {
        alert(error);
      });
    });
  }

  logout() {
    this.storage.remove(PARENT).then(() => {
      this.router.navigate(['home']);
    });
  }


  // go to add student page
  addStudent() {
    this.router.navigate(['addstudent']);
  }

  viewStudent(item) {
    this.storage.set(STUDENTINPARENTDASH, item).then(() => {
      this.router.navigate(['viewstudents']);
    });
  }

}
