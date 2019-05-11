import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const STUDENTEXAMID = 'examid';
const QUESTIONID = 'questionid';
const ROOT = 'questionroot';

@Component({
  selector: 'app-studentexamquestionslist',
  templateUrl: './studentexamquestionslist.page.html',
  styleUrls: ['./studentexamquestionslist.page.scss'],
})
export class StudentexamquestionslistPage implements OnInit {

  stExamID: any = '';
  exam: any = '';

  questions: any = '';
  imagePath = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.imagePath = this.network.mainUploadImgUrl;

    this.storage.get(STUDENTEXAMID).then(stExamId => {
      this.stExamID = stExamId;
      console.log('the stExamID is: ' + this.stExamID);
      this.network.getStudentExamByID(this.stExamID).then(examData => {
        const jsonArray = examData;
        this.exam = jsonArray[0];
        console.log('I received Exam: ' + JSON.stringify(this.exam));


        // get the data from Cache
        this.storage.get(this.stExamID).then(resultData => {
          if (resultData != null) {
            console.log('this is from cache..');
            this.questions = resultData;
          } else {
            // get the Questions list from Exam Data
            let QIDs = this.exam.QListIDs;

            this.network.getQuestionGeneralInfoByID(QIDs).then(questionData => {
              this.questions = questionData;
              console.log('the questions: ' + JSON.stringify(this.questions));
              // set the data to Cache
              this.storage.set(this.stExamID, this.questions).then(resultOfCaching => {
                console.log('the result of Caching is: ' + JSON.stringify(resultOfCaching));
              });
            });
          }
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'listofstudentexams']);
  }

  showData(data) {
    let jsonArray = data;

    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.questions.push(jsonObject);
    }

  }


  goToQuestion(position, questionType, qID) {
    this.questions[position] = '';
    console.log('the new questions: ' + JSON.stringify(this.questions));
    this.storage.set(this.stExamID, this.questions).then(result => {
      console.log('the storage has been updated. the new Data: ' + result);

      console.log('the questionType is: ' + questionType);
      this.storage.set(QUESTIONID, qID).then(() => {
        this.storage.set(ROOT , 'exam').then(() => {
          switch (questionType) {
            case '1':
              this.router.navigate(['members', 'studentsdragdrop']);
              break;
            case '2':
              this.router.navigate(['members', 'studentselectivequestions']);
              break;
            case '3':
              this.router.navigate(['members', 'studentsdragtotablequestion']);
              break;
            case '4':
              this.router.navigate(['members', 'studentdescriptivequestion']);
              break;
            case '5':
              this.router.navigate(['members', 'studentdrawingquestion']);
              break;
            case '6':
              this.router.navigate(['members', 'studentrecitequran']);
              break;

            default:
              break;
          }
        });
      });
    });
  }


  finishExam() {
    this.storage.remove(this.stExamID);
    this.network.updateStudentExam(this.stExamID, 1, 1, 1).then(updateResult => {
      console.log('the result of Updating Student Exam is: ' + updateResult);
      this.router.navigate(['members', 'dashboard']);
    });
  }

}
