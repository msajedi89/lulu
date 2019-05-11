import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
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
  selector: 'app-studentsdragdrop',
  templateUrl: './studentsdragdrop.page.html',
  styleUrls: ['./studentsdragdrop.page.scss'],
})
export class StudentsdragdropPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  answer: any = '';
  fstImageInfo: any = '';
  fstImage = '';
  secImageInfo: any = '';
  secImage = '';
  trdImageInfo: any = '';
  trdImage = '';
  questionVoice: any;

  q1 = [];
  q2 = [];
  q3 = [];
  q4 = [];

  todo = { value: '', color: '' };

  // the variable for Rooting
  fromWhere: any = 'exam';

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private dragulaService: DragulaService, private toastCtrl: ToastController, public popoverCtrl: PopoverController) {

    // set the drag event of Dragula
    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });
  }

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


    this.storage.get(QUESTIONID).then(resultQID => {
      this.QID = resultQID;

      // get the question
      this.network.getQuestionByID(this.QID).then(data => {
        let jsonArray = data;
        this.question = jsonArray[0];
        console.log('I received Question: ' + JSON.stringify(data));

        // get the descriptions for pop up
        this.descriptionEn = this.question.Description;
        this.descriptionAr = this.question.DescriptionAr;

        // get the question Voice
        this.questionVoice = new Audio();
        this.questionVoice.src = this.network.mainQuestionVoicesUrl + this.question.VoiceEn;
        this.questionVoice.load();
      });

      // get the Question's Answer
      this.network.getDragDropAnswerQuestionByID(this.QID).then(answerData => {
        let jsonArray2 = answerData;
        this.answer = jsonArray2[0];
        console.log('I received Answer: ' + JSON.stringify(answerData));
        let fstImgID = this.answer.RightOneImage;
        let secImgID = this.answer.RightTwoImage;
        let trdImgID = this.answer.RightThreeImage;

        if (this.answer.LeftOneEn != null) { this.q4.push({ value: this.answer.LeftOneEn, color: 'secondary' }); }
        if (this.answer.LeftOneAr != null) { this.q4.push({ value: this.answer.LeftOneAr, color: 'secondary' }); }
        if (this.answer.LeftOneAz != null) { this.q4.push({ value: this.answer.LeftOneAz, color: 'secondary' }); }
        if (this.answer.LeftTwoEn != null) { this.q4.push({ value: this.answer.LeftTwoEn, color: 'secondary' }); }
        if (this.answer.LeftTwoAr != null) { this.q4.push({ value: this.answer.LeftTwoAr, color: 'secondary' }); }
        if (this.answer.LeftTwoAz != null) { this.q4.push({ value: this.answer.LeftTwoAz, color: 'secondary' }); }
        if (this.answer.LeftThreeEn != null) { this.q4.push({ value: this.answer.LeftThreeEn, color: 'secondary' }); }
        if (this.answer.LeftThreeAr != null) { this.q4.push({ value: this.answer.LeftThreeAr, color: 'secondary' }); }
        if (this.answer.LeftThreeAz != null) { this.q4.push({ value: this.answer.LeftThreeAz, color: 'secondary' }); }

        // get the First Image
        if (fstImgID != 1) {
          this.network.getImageByID(fstImgID).then(fstImgData => {
            const jsonArray3 = fstImgData;
            this.fstImageInfo = jsonArray3[0];
            this.fstImage = this.network.mainUploadImgUrl + this.fstImageInfo.Image;
          });
        }

        // get the Second Image
        if (secImgID != 1) {
          this.network.getImageByID(secImgID).then(secImgData => {
            const jsonArray4 = secImgData;
            this.secImageInfo = jsonArray4[0];
            this.secImage = this.network.mainUploadImgUrl + this.secImageInfo.Image;
          });
        }

        // get the Third Image
        if (trdImgID != 1) {
          this.network.getImageByID(trdImgID).then(trdImgData => {
            const jsonArray5 = trdImgData;
            this.trdImageInfo = jsonArray5[0];
            this.trdImage = this.network.mainUploadImgUrl + this.trdImageInfo.Image;
          });
        }

        console.log('the q4 before: ' + JSON.stringify(this.q4));
        this.q4 = this.randomizeAnswers(this.q4);
        console.log('the q4 after: ' + JSON.stringify(this.q4));
      });
    });

  }

  // play the Question Voice
  playVoice() {
    this.questionVoice.play();
  }

  randomizeAnswers(collection) {
    let a, b, temp;
    for (let i = 0; i < collection.length; i++) {
      let x = Math.floor(Math.random() * collection.length);
      let y = Math.floor(Math.random() * collection.length);

      a = collection[x];
      b = collection[y];

      temp = a;
      a = b;
      b = temp;

      collection[x] = a;
      collection[y] = b;
    }
    return collection;
  }

  goBack() {
    if (this.fromWhere == 'exam') {
      this.router.navigate(['members', 'studentexamquestionslist']);
    } else if (this.fromWhere == 'homework') {
      this.router.navigate(['members', 'studenthomeworkquestionslist']);
    }
  }


  // save the results and go to the next Question
  dragOne: any = "";
  dragTwo: any = "";
  dragThree: any = "";
  goNext() {

    // get the result of first Choice
    if (this.q1.length > 0) {
      this.dragOne = this.q1[0].value;
      for (let i = 1; i < this.q1.length; i++) {
        let element = this.q1[i].value;
        this.dragOne = this.dragOne + "," + element;
      }

      console.log('the DragOne Result: ' + this.dragOne);
    }

    // get the result of second Choice
    if (this.q2.length > 0) {
      this.dragTwo = this.q2[0].value;
      for (let i = 1; i < this.q2.length; i++) {
        let element = this.q2[i].value;
        this.dragTwo = this.dragTwo + "," + element;
      }

      console.log('the DragTwo Result: ' + this.dragTwo);
    }

    // get the result of three Choice
    if (this.q3.length > 0) {
      this.dragThree = this.q3[0].value;
      for (let i = 1; i < this.q3.length; i++) {
        let element = this.q3[i].value;
        this.dragThree = this.dragThree + "," + element;
      }

      console.log("the DragThree Result: " + this.dragThree);
    }


    // record the result
    this.network.recordStudentDragDropAnswer(this.stExamID, this.stID, this.QID, this.dragOne, this.dragTwo, this.dragThree, this.fromWhere).then(result => {
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
