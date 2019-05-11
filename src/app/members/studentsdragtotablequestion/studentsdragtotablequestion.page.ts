import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
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
  selector: 'app-studentsdragtotablequestion',
  templateUrl: './studentsdragtotablequestion.page.html',
  styleUrls: ['./studentsdragtotablequestion.page.scss'],
})
export class StudentsdragtotablequestionPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

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

  // the variables for holding the result of Student's Answer
  stTableOne = '';
  stTableTwo = '';

  // the variable for Rooting
  fromWhere: any;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private dragulaService: DragulaService, public popoverCtrl: PopoverController) {

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

    // get the Question ID
    this.storage.get(QUESTIONID).then(resultQID => {
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
        if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) { this.text1 = tblOneTexts[0]; console.log('the First text: ' + this.text1); }
        if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) { this.text2 = tblOneTexts[1]; console.log('the Second text: ' + this.text2); }
        if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) { this.text3 = tblOneTexts[2]; console.log('the third text: ' + this.text3); }

        temp = this.answer.TblTwoTexts;
        const tblTwoTexts = temp.split(',');
        if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) { this.text4 = tblTwoTexts[0]; console.log('the Fourth text: ' + this.text4); }
        if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) { this.text5 = tblTwoTexts[1]; console.log('the Fifth text: ' + this.text5); }
        if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) { this.text6 = tblTwoTexts[2]; console.log('the Sixth text: ' + this.text6); }

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

  // play the Question Voice
  playVoice() {
    this.questionVoice.play();
  }

  goBack() {
    if (this.fromWhere == 'exam') {
      this.router.navigate(['members', 'studentexamquestionslist']);
    } else if (this.fromWhere == 'homework') {
      this.router.navigate(['members', 'studenthomeworkquestionslist']);
    }
  }


  // *********** Record the Student Answer ***********
  goNext() {

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


    // record the result
    this.network.recordStudentDragToTableAnswer(this.stExamID, this.stID, this.QID, this.stTableOne, this.stTableTwo, this.fromWhere).then(result => {
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
