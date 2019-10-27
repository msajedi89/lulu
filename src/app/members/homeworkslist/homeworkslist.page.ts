import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-homeworkslist',
  templateUrl: './homeworkslist.page.html',
  styleUrls: ['./homeworkslist.page.scss'],
})
export class HomeworkslistPage implements OnInit {

  allStudents: any;
  students = null;
  studentIDs = [];
  myStudentIDs = '';

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, private toastController: ToastController,
    private actionSheetController: ActionSheetController, public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get the list of all Students
      this.network.getAllStudents().then(studentData => {
        this.allStudents = studentData;
        console.log('I recieved Students: ' + JSON.stringify(this.allStudents));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }


  // ***************** Question Choosing *****************

  userChanged(event: { component: IonicSelectableComponent, value: any }) {
    console.log('event: ', event);
  }

  // when the Students Selectabe has been closed
  onCloseStudent() {
    console.log('Students: ', this.students);
    //const studentArray = this.students[0];
    this.myStudentIDs = this.students.stID;
    //this.showStudentIDs(this.students);
    console.log('the Selected Students ID: ' + this.myStudentIDs);
    //this.myStudentIDs = this.studentIDs + "";
    //console.log("I received the Selected Students IDs in String: " + this.myStudentIDs);
  }

  // show a Toast.
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });

    toast.present();
  }

  // the method for getting IDs from returning JSON 
  showStudentIDs(data) {
    let jsonArray = data;

    this.studentIDs = [];
    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.studentIDs.push(jsonObject.stID);
    }
  }



  // **************** Inserting Exam ***************
  insertHomework(name, homeworks, homeworkDate) {

    if ((name != null) && (homeworks != null) && (this.myStudentIDs != "") && (homeworkDate != null)) {

      // format the homeworkDate
      console.log('the homeworkDate: ' + homeworkDate);
      const dateFormat = homeworkDate.split('T')[0];
      console.log('the dateFormat: ' + dateFormat);

      // insert homework in table for selected Student
      this.network.insertHomeworksList(name, homeworks, dateFormat, this.myStudentIDs).then(resultData => {
        this.myStudentIDs = '';
        console.log('The result of inserting homework is: ' + resultData);
        this.presentToast('A new Homework has been inserted for selected Student.');
      }, (err) => {
        alert(err);
      });
    } else {
      alert('Please fill the Required fields');
    }
  }

}
