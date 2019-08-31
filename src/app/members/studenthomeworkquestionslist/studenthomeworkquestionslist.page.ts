import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const STUDENTHOMEWORKID = 'homeworkid';
const QUESTIONID = 'questionid';
const ROOT = 'questionroot';
const LANGUAGE = 'language';

@Component({
  selector: 'app-studenthomeworkquestionslist',
  templateUrl: './studenthomeworkquestionslist.page.html',
  styleUrls: ['./studenthomeworkquestionslist.page.scss'],
})
export class StudenthomeworkquestionslistPage implements OnInit {

  stHomeworkID: any = '';
  homework: any = '';

  questions: any = '';
  imagePath = '';

  language = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    this.imagePath = this.network.mainUploadImgUrl;

    this.storage.get(STUDENTHOMEWORKID).then(stHomeworkId => {
      this.stHomeworkID = stHomeworkId;
      console.log('the stHomeworkID is: ' + this.stHomeworkID);
      this.network.getStudentHomeworkByID(this.stHomeworkID).then(homeworkData => {
        const jsonArray = homeworkData;
        this.homework = jsonArray[0];
        console.log('I received Homework: ' + JSON.stringify(this.homework));

        // get the data from Cache
        this.storage.get(this.stHomeworkID).then(resultData => {
          if (resultData != null) {
            console.log('this is from cache..');
            this.questions = resultData;
          } else {
            // get the Questions list from Exam Date
            let QIDs = this.homework.QListIDs;

            this.network.getQuestionGeneralInfoByID(QIDs).then(questionData => {
              this.questions = questionData;
              console.log('the jsonArray2: ' + JSON.stringify(this.questions));
              // set the data to Cache
              this.storage.set(this.stHomeworkID, this.questions).then(resultOfCaching => {
                console.log('the result of Caching is: ' + JSON.stringify(resultOfCaching));
              });
            });
          }
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'listofstudenthomeworks']);
  }


  goToQuestion(position, questionType, qID) {
    this.questions[position] = '';
    console.log('the new questions: ' + JSON.stringify(this.questions));
    this.storage.set(this.stHomeworkID, this.questions).then(result => {
      console.log('the storage has been updated. the new Data: ' + result);

      console.log('the questionType is: ' + questionType);
      this.storage.set(QUESTIONID, qID).then(() => {
        this.storage.set(ROOT, 'homework').then(() => {
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


  finishHomework() {
    this.storage.remove(this.stHomeworkID);
    this.network.updateStudentHomework(this.stHomeworkID, 1, 1, 1).then(updateResult => {
      console.log('the result of Updating Student Homework is: ' + updateResult);
      this.router.navigate(['members', 'dashboard']);
    });
  }

}
