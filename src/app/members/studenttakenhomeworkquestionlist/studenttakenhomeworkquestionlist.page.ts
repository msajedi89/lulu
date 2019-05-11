import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const STUDENTHOMEWORKID = 'homeworkid';
const QUESTIONID = 'questionid';
const ROOT = 'questionroot';

@Component({
  selector: 'app-studenttakenhomeworkquestionlist',
  templateUrl: './studenttakenhomeworkquestionlist.page.html',
  styleUrls: ['./studenttakenhomeworkquestionlist.page.scss'],
})
export class StudenttakenhomeworkquestionlistPage implements OnInit {

  stHomeworkID: any = '';
  homework: any = '';

  questions: any = '';
  imagePath = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.imagePath = this.network.mainUploadImgUrl;

    this.storage.get(STUDENTHOMEWORKID).then(stHomeworkId => {
      this.stHomeworkID = stHomeworkId;
      console.log('the stHomeworkID is: ' + this.stHomeworkID);
      this.network.getStudentHomeworkByID(this.stHomeworkID).then(homeworkData => {
        const jsonArray = homeworkData;
        this.homework = jsonArray[0];
        console.log('I received Homework: ' + JSON.stringify(this.homework));

        let QIDs = this.homework.QListIDs;

        this.network.getQuestionGeneralInfoByID(QIDs).then(questionData => {
          this.questions = questionData;
          console.log('the jsonArray2: ' + JSON.stringify(this.questions));
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'listofstudenttakenhomework']);
  }

  goToQuestion(questionType, qID) {

    console.log('the questionType is: ' + questionType);
    this.storage.set(QUESTIONID, qID).then(() => {
      this.storage.set(ROOT, 'homework').then(() => {
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
