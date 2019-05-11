import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-makingexam',
  templateUrl: './makingexam.page.html',
  styleUrls: ['./makingexam.page.scss'],
})
export class MakingexamPage implements OnInit {

  // Selectable Variables
  allQuestions: any;
  questions = [];
  questionIDs = [];
  myQuestionIDs: string = "";

  allStudents: any;
  students = [];
  studentIDs = [];
  myStudentIDs: string = "";

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, private toastController: ToastController,
    private actionSheetController: ActionSheetController, public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      // get the list of all Questions
      this.network.getAllQuestions().then(questionData => {
        this.allQuestions = questionData;
        console.log('I recieved Questions: ' + JSON.stringify(this.allQuestions));
      });

      // get the list of all Students
      this.network.getAllStudents().then(studentsData => {
        this.allStudents = studentsData;
        console.log('I recieved students: ' + JSON.stringify(this.allStudents));
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }

  // ***************** Question Choosing *****************

  userChanged(event: { component: IonicSelectableComponent, value: any }) {
    console.log('event: ', event);
    console.log('users: ', this.allQuestions);
  }

  // when select component has been closed.
  onClose() {
    console.log('Questions: ', this.questions);
    this.showQuestionIDs(this.questions);
    console.log("the Selected Question IDs in Array: " + this.questionIDs);
    this.myQuestionIDs = this.questionIDs + "";
    console.log("I received the Selected Questions IDs in String: " + this.myQuestionIDs);
  }

  // when the Students Selectabe has been closed
  onCloseStudent() {
    console.log('Students: ', this.students);
    this.showStudentIDs(this.students);
    console.log("the Selected Students IDs in Array: " + this.studentIDs);
    this.myStudentIDs = this.studentIDs + "";
    console.log("I received the Selected Students IDs in String: " + this.myStudentIDs);
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


  // the method for getting QuestionIDs from returning JSON 
  showQuestionIDs(data) {
    let jsonArray = data;

    this.questionIDs = [];
    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.questionIDs.push(jsonObject.QID);
    }
  }

  // the method for getting IDs from returning JSON 
  showStudentIDs(data) {
    let jsonArray = data;

    this.studentIDs = [];
    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.studentIDs.push(jsonObject.stID);
      //this.myStudentIDs += jsonObject.stID + ",";
    }
  }




  // **************** Inserting Exam ***************
  insertExam(name, subject, examDate) {

    if ((name != null) && (subject != null) && (this.myQuestionIDs != "") && (examDate != null)) {
      let myExamID;
      this.network.insertExam(name, subject, examDate, this.myQuestionIDs, this.myStudentIDs).then(data => {
        myExamID = this.showData(data);
        console.log("The inserted Exam ID is: " + myExamID);
        this.presentToast("A new Exam with ID: " + myExamID + " has been inserted.");

        // insert an Exam record for Chosen students
        for (let i = 0; i < this.studentIDs.length; i++) {
          let stID = this.studentIDs[i];
          this.network.insertStudentExam(myExamID, stID).then(data => {
            console.log("I received: " + JSON.stringify(data));
          }, (err) => {
            console.log(err);
            alert(err);
          });
        }
      }, (err) => {
        alert(err);
      });
    } else {
      alert("Please fill the Required fields");
    }
  }




  // the method for getting IDs from returning JSON 
  returnValue: any;
  showData(data) {
    let jsonArray = data;

    for (let obj of jsonArray) {
      for (let key in obj) {
        this.returnValue = obj[key];
      }
    }
    return this.returnValue;
  }

}
