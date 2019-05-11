import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { PopoverComponent } from 'src/app/popover/popover.component';

const LECTERNQUESTIONID = 'lecternqid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-lecterndragtablequestion',
  templateUrl: './lecterndragtablequestion.page.html',
  styleUrls: ['./lecterndragtablequestion.page.scss'],
})
export class LecterndragtablequestionPage implements OnInit {

  QID: any;

  question: any = '';
  answer: any = '';
  questionVoice: any;

  q1 = [];
  q2 = [];
  q3 = [];
  q4 = [];
  q5 = [];

  // the variables to hold the Texts
  text1 = '';
  text2 = '';
  text3 = '';
  text4 = '';
  text5 = '';
  text6 = '';

  // the variable for determining of the arranges of Texts
  arrange = Math.floor(Math.random() * 3) + 1;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  // ******** the variables for Evaluation ********
  studentAnswer: any = '';
  stTableOne = '';
  stTableTwo = '';
  stTableOneTexts: any;
  stTableTwoTexts: any;
  q4Temp = [];
  q5Temp = [];
  q4Real = [];
  q5Real = [];

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private dragulaService: DragulaService, public popoverCtrl: PopoverController) {

    // set the drag event of Dragula
    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });
  }

  ngOnInit() {

    // get the Question ID
    this.storage.get(LECTERNQUESTIONID).then(resultQID => {
      this.QID = resultQID;

      // *********** get the question ***********
      this.network.getQuestionByID(this.QID).then(data => {
        const jsonArray = data;
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

      // ************* get the question's Answer **************
      this.network.getDragToTableAnswersByID(this.QID).then(answerData => {
        const jsonArray2 = answerData;
        this.answer = jsonArray2[0];
        console.log('I received Question: ' + JSON.stringify(this.answer));

        // ***** Split the text and get the Texts *****
        let temp = this.answer.TblOneTexts;
        const tblOneTexts = temp.split(',');
        if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) {
          this.text1 = tblOneTexts[0];
          this.q4Real.push(this.text1);
          console.log('the First text: ' + this.text1);
        }
        if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) {
          this.text2 = tblOneTexts[1];
          this.q4Real.push(this.text2);
          console.log('the Second text: ' + this.text2);
        }
        if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) {
          this.text3 = tblOneTexts[2];
          this.q4Real.push(this.text3);
          console.log('the third text: ' + this.text3);
        }

        temp = this.answer.TblTwoTexts;
        const tblTwoTexts = temp.split(',');
        if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) {
          this.text4 = tblTwoTexts[0];
          this.q5Real.push(this.text4);
          console.log('the Fourth text: ' + this.text4);
        }
        if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) {
          this.text5 = tblTwoTexts[1];
          this.q5Real.push(this.text5);
          console.log('the Fifth text: ' + this.text5);
        }
        if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) {
          this.text6 = tblTwoTexts[2];
          this.q5Real.push(this.text6);
          console.log('the Sixth text: ' + this.text6);
        }

        // ***** Determine the arrange of Texts to show
        console.log('the arrange value: ' + this.arrange);

        switch (this.arrange) {
          case 1:
            if (this.text2 != '') { this.q1.push({ value: this.text2, color: 'secondary' }); }
            if (this.text4 != '') { this.q1.push({ value: this.text4, color: 'secondary' }); }
            if (this.text3 != '') { this.q2.push({ value: this.text3, color: 'secondary' }); }
            if (this.text5 != '') { this.q2.push({ value: this.text5, color: 'secondary' }); }
            if (this.text1 != '') { this.q3.push({ value: this.text1, color: 'secondary' }); }
            if (this.text6 != '') { this.q3.push({ value: this.text6, color: 'secondary' }); }
            break;
          case 2:
            if (this.text3 != '') { this.q1.push({ value: this.text3, color: 'secondary' }); }
            if (this.text6 != '') { this.q1.push({ value: this.text6, color: 'secondary' }); }
            if (this.text1 != '') { this.q2.push({ value: this.text1, color: 'secondary' }); }
            if (this.text2 != '') { this.q2.push({ value: this.text2, color: 'secondary' }); }
            if (this.text4 != '') { this.q3.push({ value: this.text4, color: 'secondary' }); }
            if (this.text5 != '') { this.q3.push({ value: this.text5, color: 'secondary' }); }
            break;
          case 3:
            if (this.text5 != '') { this.q1.push({ value: this.text5, color: 'secondary' }); }
            if (this.text2 != '') { this.q1.push({ value: this.text2, color: 'secondary' }); }
            if (this.text4 != '') { this.q2.push({ value: this.text4, color: 'secondary' }); }
            if (this.text3 != '') { this.q2.push({ value: this.text3, color: 'secondary' }); }
            if (this.text6 != '') { this.q3.push({ value: this.text6, color: 'secondary' }); }
            if (this.text1 != '') { this.q3.push({ value: this.text1, color: 'secondary' }); }
            break;

          default:
            break;
        }
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


  // *********** Record the Student Answer ***********
  evaluateStudentAnswer() {


    // get the result of first Table
    if (this.q4.length > 0) {
      this.stTableOne = this.q4[0].value;
      for (let i = 1; i < this.q4.length; i++) {
        const element = this.q4[i].value;
        this.stTableOne = this.stTableOne + ',' + element;
      }
    }

    // get the result of Second Table
    if (this.q5.length > 0) {
      this.stTableTwo = this.q5[0].value;
      for (let i = 1; i < this.q5.length; i++) {
        const element = this.q5[i].value;
        this.stTableTwo = this.stTableTwo + ',' + element;
      }
    }

    console.log('the TableOne Result: ' + this.stTableOne);
    console.log('the TableTwo Result: ' + this.stTableTwo);


    let x = this.stTableOne;
    this.stTableOneTexts = x.split(',');
    console.log('the stTableOneTexts: ' + this.stTableOneTexts);
    let y = this.stTableTwo;
    this.stTableTwoTexts = y.split(',');
    console.log('the stTableTwoTexts: ' + this.stTableTwoTexts);

    // evaluate of First Table
    this.q4Temp = this.q4;
    this.q4 = [];
    let textX = '';
    let found = false;
    for (let i = 0; i < this.stTableOneTexts.length; i++) {
      textX = this.stTableOneTexts[i];
      found = false;
      for (let j = 0; j < this.q4Real.length; j++) {
        if (textX == this.q4Real[j]) {
          found = true;
        }
      }
      if (found == true) {
        this.q4.push({ value: textX, color: '#00fa00' });
      } else {
        this.q4.push({ value: textX, color: '#F3534B' });
      }
    }

    // Evaluate of Second Table
    this.q5Temp = this.q5;
    this.q5 = [];
    textX = '';
    found = false;
    for (let i = 0; i < this.stTableTwoTexts.length; i++) {
      textX = this.stTableTwoTexts[i];
      found = false;
      for (let j = 0; j < this.q5Real.length; j++) {
        if (textX == this.q5Real[j]) {
          found = true;
        }
      }
      if (found == true) {
        this.q5.push({ value: textX, color: '#00fa00' });
      } else {
        this.q5.push({ value: textX, color: '#F3534B' });
      }
    }

  }

}
