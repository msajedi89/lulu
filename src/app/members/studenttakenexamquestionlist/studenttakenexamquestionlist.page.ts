import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const STUDENTEXAMID = 'examid';
const QUESTIONID = 'questionid';
const ROOT = 'questionroot';

@Component({
  selector: 'app-studenttakenexamquestionlist',
  templateUrl: './studenttakenexamquestionlist.page.html',
  styleUrls: ['./studenttakenexamquestionlist.page.scss'],
})
export class StudenttakenexamquestionlistPage implements OnInit {

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


        // get the Questions list from Exam Data
        let QIDs = this.exam.QListIDs;

        this.network.getQuestionGeneralInfoByID(QIDs).then(questionData => {
          this.questions = questionData;
          console.log('the jsonArray2: ' + JSON.stringify(this.questions));
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'listofstudentstakenexam']);
  }

  goToQuestion( questionType, qID) {

    console.log('the questionType is: ' + questionType);
    this.storage.set(QUESTIONID, qID).then(() => {
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
  }

}
