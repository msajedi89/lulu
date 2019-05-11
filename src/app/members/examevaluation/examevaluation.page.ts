import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const studentKey = 'student';
const studentExamKey = 'studentexam';

const QUESTIONID = 'questionid';
const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const ROOT = 'questionroot';

@Component({
  selector: 'app-examevaluation',
  templateUrl: './examevaluation.page.html',
  styleUrls: ['./examevaluation.page.scss'],
})
export class ExamevaluationPage implements OnInit {

  stID: any;
  namefamily: any[];
  profileImg: any[];
  birthdate: any[];
  profileImgUrl: string = '';

  stExamID: any;
  studentExam: any = '';
  questionsList: any;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController) { }

  ngOnInit() {

    this.storage.get(studentKey).then(result => {
      this.stID = result;
      console.log('this page recieved stID: ' + this.stID);
      // get the Student
      this.network.getStudentByID(this.stID).then(data => {
        this.showData(data);
        console.log('I recieved this Student: ' + JSON.stringify(data));

        this.profileImgUrl = this.network.mainStudentsProfileImgUrl + this.profileImg;

        // 1-detection of entered Exam    2-get its information
        this.storage.get(studentExamKey).then(resultExamID => {
          this.stExamID = resultExamID;
          console.log('the stExamID: ' + this.stExamID);

          this.network.getStudentExamByID(this.stExamID).then(examData => {
            const jsonArray2 = examData;
            this.studentExam = jsonArray2[0];
            console.log('I received studentExam: ' + JSON.stringify(this.studentExam));

            // get the questions of this Exam
            let QIDs = this.studentExam.QListIDs;
            console.log('the QIDs: ' + QIDs);
            this.network.getQuestionGeneralInfoByID(QIDs).then(questionsData => {
              this.questionsList = questionsData;
              console.log('the questionsList: ' + JSON.stringify(this.questionsList));
            });
          });
        });

      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'studentsexamlist']);
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

  recordMark(mark) {
    if (mark != null) {
      this.network.recordStudentMark(this.stExamID, mark, 'exam').then(result => {
        console.log('the result of giving Mark is: ' + JSON.stringify(result));
        this.presentToast('Mark saved successfully');
      });
    } else {
      alert('Please fill the Required fields');
    }
  }

  goToQuestion(qID, questionType) {
    console.log('the questionType is: ' + questionType);
    // set the Student ID
    this.storage.set(USERID, this.stID).then(() => {
      // set the Student Exam ID
      this.storage.set(STUDENTEXAMID , this.stExamID).then(() => {
        // set the Student Exam Question ID
        this.storage.set(QUESTIONID, qID).then(() => {
          // set the Root to define where to came back
          this.storage.set(ROOT, 'exam').then(() => {
            switch (questionType) {
              case '1':
                this.router.navigate(['members', 'evaluationofdragdropquestions']);
                break;
              case '2':
                this.router.navigate(['members', 'evaluationofselectivequestion']);
                break;
              case '3':
                this.router.navigate(['members', 'evaluationofdragtotablequestion']);
                break;
              case '4':
                this.router.navigate(['members', 'evaluationofdescriptivequestions']);
                break;
              case '5':
                this.router.navigate(['members', 'evaluationofdrawingquestions']);
                break;
              case '6':
                this.router.navigate(['members', 'evaluationofrecitequranquestions']);
                break;

              default:
                break;
            }
          });
        });
      });
    });
  }

  showData(data) {
    let jsonArray = data;

    this.namefamily = [];
    this.profileImg = [];
    this.birthdate = [];

    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.namefamily.push(jsonObject.NameFamily);
      this.profileImg.push(jsonObject.ProfileImg);
      this.birthdate.push(jsonObject.Birthdate);
    }
  }

}
