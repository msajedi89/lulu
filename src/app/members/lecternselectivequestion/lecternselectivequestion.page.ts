import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverComponent } from 'src/app/popover/popover.component';

const LECTERNQUESTIONID = 'lecternqid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-lecternselectivequestion',
  templateUrl: './lecternselectivequestion.page.html',
  styleUrls: ['./lecternselectivequestion.page.scss'],
})
export class LecternselectivequestionPage implements OnInit {

  QID: any;

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

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  // the variables for Evaluating and Shownig the Correct Answers.
  oneColor = '#b9d6da';
  twoColor = '#b9d6da';
  threeColor = '#b9d6da';
  oneReal = false;
  twoReal = false;
  threeReal = false;
  stOne = false;
  stTwo = false;
  stThree = false;
  correctChoices: any;
  studentChoices: any;
  studentAnswer: any = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, public popoverCtrl: PopoverController) { }

  ngOnInit() {

    // get the Question ID
    this.storage.get(LECTERNQUESTIONID).then(resultQID => {
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
        this.correctChoices = this.answer.RightAnswers;

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

  goBack() {
    this.router.navigate(['members', 'lecternquestionspage']);
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

  // *********** when the Student click on Choices ************
  select(choice) {

    this.playVoice(choice);

    // *********** if the question is on Multi Selection ***********
    if (this.isMulti == true) {

      // change the color of First Choice on Click
      if (choice === 'fstChoice') {
        if (this.fstSelected === true) {
          this.fstSelected = false;
          this.oneColor = '#b9d6da';
        } else {
          this.fstSelected = true;
          this.oneColor = '#6BC357';
        }
      }

      // change the color of Second Choice on Click
      if (choice === 'secChoice') {
        if (this.secSelected === true) {
          this.secSelected = false;
          this.twoColor = '#b9d6da';
        } else {
          this.secSelected = true;
          this.twoColor = '#6BC357';
        }
      }

      // change the color of Third Choice on Click
      if (choice === 'trdChoice') {
        if (this.trdSelected === true) {
          this.trdSelected = false;
          this.threeColor = '#b9d6da';
        } else {
          this.trdSelected = true;
          this.threeColor = '#6BC357';
        }
      }
    } else {
      // ********** if the question is on Single Selection Mode. ***********
      switch (choice) {
        case 'fstChoice':
          this.fstSelected = true;
          this.secSelected = false;
          this.trdSelected = false;
          this.oneColor = '#6BC357';
          this.twoColor = '#b9d6da';
          this.threeColor = '#b9d6da';
          break;
        case 'secChoice':
          this.fstSelected = false;
          this.secSelected = true;
          this.trdSelected = false;
          this.oneColor = '#b9d6da';
          this.twoColor = '#6BC357';
          this.threeColor = '#b9d6da';
          break;
        case 'trdChoice':
          this.fstSelected = false;
          this.secSelected = false;
          this.trdSelected = true;
          this.oneColor = '#b9d6da';
          this.twoColor = '#b9d6da';
          this.threeColor = '#6BC357';
          break;

        default:
          break;
      }
    }
  }

  findx(x, collection) {
    let found = false;
    for (let i = 0; i < collection.length; i++) {
      if (x == collection[i]) {
        found = true;
      }
    }
    return found;
  }


  evaluateStudentAnswer() {
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

      let y = this.studentSelects;
      this.studentChoices = y.split(',');

      // ******* Determine the Correct Choices *******
      let isIn = false;
      // Check the First choice is Answer or not?
      isIn = this.findx(1, this.correctChoices);
      if (isIn == true) { this.oneReal = true; console.log('the oneReal is: ' + this.oneReal); }
      // Check the Second choice is Answer or not?
      isIn = this.findx(2, this.correctChoices);
      if (isIn == true) { this.twoReal = true; console.log('the twoReal is: ' + this.twoReal); }
      // Check the Third choice is Answer or not?
      isIn = this.findx(3, this.correctChoices);
      if (isIn == true) { this.threeReal = true; console.log('the threeReal is: ' + this.threeReal); }

      // ******* get the Students Choices *******
      // Check the Student Choose the First Choice or not?
      isIn = false;
      isIn = this.findx(1, this.studentChoices);
      if (isIn == true) { this.stOne = true; console.log('the stOne is: ' + this.stOne); }
      // Check the Student Choose the Second Choice or not?
      isIn = this.findx(2, this.studentChoices);
      if (isIn == true) { this.stTwo = true; console.log('the stTwo is: ' + this.stTwo); }
      // Check the Student Choose the Third Choice or not?
      isIn = this.findx(3, this.studentChoices);
      if (isIn == true) { this.stThree = true; console.log('the stThree is: ' + this.stThree); }

      // ******* Evaluation Process *******
      // evaluate the First Choice
      if (this.oneReal == true) {
        if (this.stOne == true) {
          this.oneColor = '#00fa00';
        } else {
          this.oneColor = 'yellow';
        }
      } else {
        if (this.stOne == true) {
          this.oneColor = '#F3534B';
        } else {
          this.oneColor = '#b9d6da';
        }
      }
      // evaluate the Second Choice
      if (this.twoReal == true) {
        if (this.stTwo == true) {
          this.twoColor = '#00fa00';
        } else {
          this.twoColor = 'yellow';
        }
      } else {
        if (this.stTwo == true) {
          this.twoColor = '#F3534B';
        } else {
          this.twoColor = '#b9d6da';
        }
      }
      // evaluate the Third Choice
      if (this.threeReal == true) {
        if (this.stThree == true) {
          this.threeColor = '#00fa00';
        } else {
          this.threeColor = 'yellow';
        }
      } else {
        if (this.stThree == true) {
          this.threeColor = '#F3534B';
        } else {
          this.threeColor = '#b9d6da';
        }
      }
    }
  }

}
