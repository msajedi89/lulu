import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/popover/popover.component';

const LECTERNQUESTIONID = 'lecternqid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-lecterndragdropquestion',
  templateUrl: './lecterndragdropquestion.page.html',
  styleUrls: ['./lecterndragdropquestion.page.scss'],
})
export class LecterndragdropquestionPage implements OnInit {

  QID: any;

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

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  // ***** the variables for Evaluation *****
  studentAnswer: any = '';
  // the variables for showing student results along with Evaluation
  q1Real = [];
  q2Real = [];
  q3Real = [];

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private dragulaService: DragulaService, private toastCtrl: ToastController, public popoverCtrl: PopoverController) {

    // set the drag event of Dragula
    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });
  }

  ngOnInit() {

    this.storage.get(LECTERNQUESTIONID).then(resultQID => {
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

        if (this.answer.LeftOneEn != null) {
          this.q4.push({ value: this.answer.LeftOneEn, color: 'secondary' });
          this.q1Real.push(this.answer.LeftOneEn);
        }
        if (this.answer.LeftOneAr != null) {
          this.q4.push({ value: this.answer.LeftOneAr, color: 'secondary' });
          this.q1Real.push(this.answer.LeftOneAr);
        }
        if (this.answer.LeftOneAz != null) {
          this.q4.push({ value: this.answer.LeftOneAz, color: 'secondary' });
          this.q1Real.push(this.answer.LeftOneAz);
        }
        if (this.answer.LeftTwoEn != null) {
          this.q4.push({ value: this.answer.LeftTwoEn, color: 'secondary' });
          this.q2Real.push(this.answer.LeftTwoEn);
        }
        if (this.answer.LeftTwoAr != null) {
          this.q4.push({ value: this.answer.LeftTwoAr, color: 'secondary' });
          this.q2Real.push(this.answer.LeftTwoAr);
        }
        if (this.answer.LeftTwoAz != null) {
          this.q4.push({ value: this.answer.LeftTwoAz, color: 'secondary' });
          this.q2Real.push(this.answer.LeftTwoAz);
        }
        if (this.answer.LeftThreeEn != null) {
          this.q4.push({ value: this.answer.LeftThreeEn, color: 'secondary' });
          this.q3Real.push(this.answer.LeftThreeEn);
        }
        if (this.answer.LeftThreeAr != null) {
          this.q4.push({ value: this.answer.LeftThreeAr, color: 'secondary' });
          this.q3Real.push(this.answer.LeftThreeAr);
        }
        if (this.answer.LeftThreeAz != null) {
          this.q4.push({ value: this.answer.LeftThreeAz, color: 'secondary' });
          this.q3Real.push(this.answer.LeftThreeAz);
        }

        console.log('the q1Real is: ' + this.q1Real);
        console.log('the q2Real is: ' + this.q2Real);
        console.log('the q3Real is: ' + this.q3Real);

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

  goBack() {
    this.router.navigate(['members', 'lecternquestionspage']);
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


  // save the results and go to the next Question
  dragOne: any = "";
  dragTwo: any = "";
  dragThree: any = "";
  evaluateStudentAnswer() {

    // get the result of first Choice
    if (this.q1.length > 0) {
      this.dragOne = this.q1[0].value;
      for (let i = 1; i < this.q1.length; i++) {
        let element = this.q1[i].value;
        this.dragOne = this.dragOne + ',' + element;
      }

      console.log('the DragOne Result: ' + this.dragOne);
    }

    // get the result of second Choice
    if (this.q2.length > 0) {
      this.dragTwo = this.q2[0].value;
      for (let i = 1; i < this.q2.length; i++) {
        let element = this.q2[i].value;
        this.dragTwo = this.dragTwo + ',' + element;
      }

      console.log('the DragTwo Result: ' + this.dragTwo);
    }

    // get the result of three Choice
    if (this.q3.length > 0) {
      this.dragThree = this.q3[0].value;
      for (let i = 1; i < this.q3.length; i++) {
        let element = this.q3[i].value;
        this.dragThree = this.dragThree + ',' + element;
      }

      console.log('the DragThree Result: ' + this.dragThree);
    }

    this.q1 = [];
    this.q2 = [];
    this.q3 = [];

    // Evaluate First Choice of Student
    let found = false;
    let x = this.dragOne;
    let fstStAnswer = x.split(',');
    console.log('the fstStAnswer is: ' + fstStAnswer);
    if (fstStAnswer.length > 0) {
      for (let i = 0; i < fstStAnswer.length; i++) {
        let textX = fstStAnswer[i];
        found = false;
        for (let j = 0; j < this.q1Real.length; j++) {
          if (textX == this.q1Real[j]) {
            found = true;
          }
        }
        if (found == true) {
          this.q1.push({ value: textX, color: '#00fa00' });
        } else {
          this.q1.push({ value: textX, color: '#F3534B' });
        }
      }
    }

    // Evaluate the Second Choice of Student
    let y = this.dragTwo;
    let secStAnswer = y.split(',');
    console.log('the secStAnswer is: ' + secStAnswer);
    if (secStAnswer.length > 0) {
      for (let i = 0; i < secStAnswer.length; i++) {
        let textX = secStAnswer[i];
        found = false;
        for (let j = 0; j < this.q2Real.length; j++) {
          if (textX == this.q2Real[j]) {
            found = true;
          }
        }
        if (found == true) {
          this.q2.push({ value: textX, color: '#00fa00' });
        } else {
          this.q2.push({ value: textX, color: '#F3534B' });
        }
      }
    }

    // Evaluate the Third Choice of Student
    let z = this.dragThree;
    let trdStAnswer = z.split(',');
    console.log('the trdStAnswer is: ' + trdStAnswer);
    if (trdStAnswer.length > 0) {
      for (let i = 0; i < trdStAnswer.length; i++) {
        let textX = trdStAnswer[i];
        found = false;
        for (let j = 0; j < this.q3Real.length; j++) {
          if (textX == this.q3Real[j]) {
            found = true;
          }
        }
        if (found == true) {
          this.q3.push({ value: textX, color: '#00fa00' });
        } else {
          this.q3.push({ value: textX, color: '#F3534B' });
        }
      }
    }
  }

}
