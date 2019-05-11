import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverComponent } from 'src/app/popover/popover.component';

const QUESTIONID = 'questionid';
const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const ROOT = 'questionroot';
const STUDENTHOMEWORKID = 'homeworkid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-studentselectivequestions',
  templateUrl: './studentselectivequestions.page.html',
  styleUrls: ['./studentselectivequestions.page.scss'],
})
export class StudentselectivequestionsPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  questionImage: any = '';
  answer: any = '';
  questionVoice: any;
  fstVoice: any;
  secVoice: any;
  trdVoice: any;

  // determines that the Question is single Selection or Multi
  isMulti = false;

  // the Choice's ID
  fstChoiceID: any = '';
  secChoiceID: any = '';
  trdChoiceID: any = '';

  // the variables for holding the Choices information
  fstChoice: any = '';
  secChoice: any = '';
  trdChoice: any = '';

  // the variables for choice's Image
  fstChoiceImg: any = '';
  secChoiceImg: any = '';
  trdChoiceImg: any = '';

  // the variables to show which Choices are selected
  fstSelected = false;
  secSelected = false;
  trdSelected = false;

  // the variable to record Student's Selects
  studentSelects: any = '';

  // the variable for Rooting
  fromWhere: any;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, public popoverCtrl: PopoverController) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    this.storage.set(DESCRIPTIONENGLISH, this.descriptionEn);
    this.storage.set(DESCRIPTIONARABIC, this.descriptionAr);

    return await popover.present();
  }

  ngOnInit() {

    this.storage.get(ROOT).then(whereResult => {
      this.fromWhere = whereResult;
      console.log('from Where: ' + this.fromWhere);

      if (this.fromWhere == 'exam') {
        // get the Student Exam ID
        this.storage.get(STUDENTEXAMID).then(resultstExamID => {
          this.stExamID = resultstExamID;
          console.log('the stExamID is: ' + this.stExamID);
        });
      } else if (this.fromWhere == 'homework') {
        // get the Student Homework ID
        this.storage.get(STUDENTHOMEWORKID).then(resultstExamID => {
          this.stExamID = resultstExamID;
          console.log('the stHomeworkID is: ' + this.stExamID);
        });
      }
    });

    // get the Student ID
    this.storage.get(USERID).then(resultUserID => {
      this.stID = resultUserID;
      console.log('the stID is: ' + this.stID);
    });

    // get the Question ID
    this.storage.get(QUESTIONID).then(resultQID => {
      this.QID = resultQID;
      console.log('the QID is: ' + this.QID);

      // get the question
      this.network.getQuestionByID(this.QID).then(data => {
        const jsonArray = data;
        this.question = jsonArray[0];
        console.log('the question: ' + JSON.stringify(this.question));

        // get the descriptions for pop up
        this.descriptionEn = this.question.Description;
        this.descriptionAr = this.question.DescriptionAr;

        // get the question Voice
        this.questionVoice = new Audio();
        this.questionVoice.src = this.network.mainQuestionVoicesUrl + this.question.VoiceEn;
        this.questionVoice.load();
      });

      // get the question' Answer
      this.network.getSelectiveQuestionAnswersByID(this.QID).then(Answerdata => {
        const jsonArray2 = Answerdata;
        this.answer = jsonArray2[0];
        console.log('the Questions Answer: ' + JSON.stringify(this.answer));

        this.isMulti = this.answer.Multi;
        this.fstChoiceID = this.answer.FirstChoice;
        this.secChoiceID = this.answer.SecChoice;
        this.trdChoiceID = this.answer.ThirdChoice;

        console.log('Selection State: ' + this.isMulti);
        console.log('the fstChoiceID: ' + this.fstChoiceID);
        console.log('the secChoiceID: ' + this.secChoiceID);
        console.log('the trdChoiceID: ' + this.trdChoiceID);

        if (this.fstChoiceID != null) {
          this.network.getSelectionChoicesByID(this.fstChoiceID).then(fstData => {
            const jsonArray3 = fstData;
            this.fstChoice = jsonArray3[0];
            this.fstChoiceImg = this.network.mainUploadImgUrl + this.fstChoice.Image;
            console.log('the fstChoice Data: ' + JSON.stringify(this.fstChoice));

            // get the Selection Voice
            this.fstVoice = new Audio();
            this.fstVoice.src = this.network.mainQuestionVoicesUrl + this.fstChoice.VoiceEn;
            this.fstVoice.load();
          });
        }

        if (this.secChoiceID != null) {
          this.network.getSelectionChoicesByID(this.secChoiceID).then(secData => {
            const jsonArray4 = secData;
            this.secChoice = jsonArray4[0];
            this.secChoiceImg = this.network.mainUploadImgUrl + this.secChoice.Image;
            console.log('the secChoice Data: ' + JSON.stringify(this.secChoice));

            // get the Selection Voice
            this.secVoice = new Audio();
            this.secVoice.src = this.network.mainQuestionVoicesUrl + this.secChoice.VoiceEn;
            this.secVoice.load();
          });
        }

        if (this.trdChoiceID != null) {
          this.network.getSelectionChoicesByID(this.trdChoiceID).then(trdData => {
            const jsonArray5 = trdData;
            this.trdChoice = jsonArray5[0];
            this.trdChoiceImg = this.network.mainUploadImgUrl + this.trdChoice.Image;
            console.log('the trdChoice Data: ' + JSON.stringify(this.trdChoice));

            // get the Selection Voice
            this.trdVoice = new Audio();
            this.trdVoice.src = this.network.mainQuestionVoicesUrl + this.trdChoice.VoiceEn;
            this.trdVoice.load();
          });
        }
      });
    });
  }

  // play the Question Voice
  playVoice(rootVoice) {
    if (rootVoice == 'question') {
      this.questionVoice.play();
    } else if (rootVoice == 'fstChoice') {
      this.fstVoice.play();
    } else if (rootVoice == 'secChoice') {
      this.secVoice.play();
    } else if (rootVoice == 'trdChoice') {
      this.trdVoice.play();
    }
  }


  goBack() {
    if (this.fromWhere == 'exam') {
      this.router.navigate(['members', 'studentexamquestionslist']);
    } else if (this.fromWhere == 'homework') {
      this.router.navigate(['members', 'studenthomeworkquestionslist']);
    }
  }

  select(choice) {

    this.playVoice(choice);

    // *********** if the question is on Multi Selection ***********
    if (this.isMulti == true) {

      // change the color of First Choice on Click
      if (choice === 'fstChoice') {
        if (this.fstSelected === true) {
          this.fstSelected = false;
        } else {
          this.fstSelected = true;
        }
      }

      // change the color of Second Choice on Click
      if (choice === 'secChoice') {
        if (this.secSelected === true) {
          this.secSelected = false;
        } else {
          this.secSelected = true;
        }
      }

      // change the color of Third Choice on Click
      if (choice === 'trdChoice') {
        if (this.trdSelected === true) {
          this.trdSelected = false;
        } else {
          this.trdSelected = true;
        }
      }
    } else {
      // ********** if the question is on Single Selection Mode. ***********
      switch (choice) {
        case 'fstChoice':
          this.fstSelected = true;
          this.secSelected = false;
          this.trdSelected = false;
          break;
        case 'secChoice':
          this.fstSelected = false;
          this.secSelected = true;
          this.trdSelected = false;
          break;
        case 'trdChoice':
          this.fstSelected = false;
          this.secSelected = false;
          this.trdSelected = true;
          break;

        default:
          break;
      }
    }
  }


  // *************** Record the Student's Answer ****************
  goNext() {

    if ((this.fstSelected === false) && (this.secSelected === false) && (this.trdSelected === false)) {
      alert('Please Select one of the Choices');
    } else {
      this.studentSelects = '';
      if (this.isMulti == true) {

        if (this.fstSelected === true) {
          this.studentSelects = '1,';
        }
        if (this.secSelected === true) {
          this.studentSelects += '2,';
        }
        if (this.trdSelected === true) {
          this.studentSelects += '3';
        }
      } else {
        if (this.fstSelected === true) {
          this.studentSelects = '1';
        }
        if (this.secSelected === true) {
          this.studentSelects = '2';
        }
        if (this.trdSelected === true) {
          this.studentSelects = '3';
        }
      }

      console.log('the Students Answer: ' + this.studentSelects);

      /*let x = this.studentSelects.split(',');
      console.log('the result of Split: ' + x[0]);
      console.log('the result of Split: ' + x[1]);*/

      // *********** rercord the Answer to database ***********
      this.network.recordStudentSelectiveAnswer(this.stExamID, this.stID, this.QID, this.studentSelects, this.fromWhere).then(result => {
        console.log('I received: ' + JSON.stringify(result));
        if (this.fromWhere == 'exam') {
          this.router.navigate(['members', 'studentexamquestionslist']);
        } else if (this.fromWhere == 'homework') {
          this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
      }, (err) => {
        alert(err);
      });
    }
  }

}
