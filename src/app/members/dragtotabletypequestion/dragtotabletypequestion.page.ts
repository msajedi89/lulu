import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';

@Component({
  selector: 'app-dragtotabletypequestion',
  templateUrl: './dragtotabletypequestion.page.html',
  styleUrls: ['./dragtotabletypequestion.page.scss'],
})
export class DragtotabletypequestionPage implements OnInit {

  // Selectable Variables
  mainTitles: any;
  mainTitle = null;
  subTitles: any;
  subTitle = null;

  // required variables for inserting Question
  myQuestionVoiceID: any = 1;
  myQuestionImgID: any = 1;

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, private toastController: ToastController,
    private actionSheetController: ActionSheetController, public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get Main Titles
      this.network.getMainTitles().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.mainTitles = data;
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'questions']);
  }

  // ***************** Main Title Select *****************

  userChanged(event: { component: IonicSelectableComponent, value: any }) {
    console.log('event: ', event);
    console.log('users: ', this.mainTitle);
  }

  // when select component has been closed.
  onClose() {
    // get the Sub Title of Chosen Main Title
    this.network.getSubTitles(this.mainTitle.mtID).then(data => {
      console.log('I recieved Sub Title: ' + JSON.stringify(data));
      this.subTitles = data;
    });
  }

  // show a Toast.
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });

    toast.present();
  }


  // the method for getting IDs from returning JSON 
  returnValue: any;
  showData(data) {
    let jsonArray = data;

    for (let obj of jsonArray) {
      for (let key in obj) {
        this.returnValue = obj[key];
      }
    }
    return this.returnValue;
  }





  // **************** the Inserting Question Section ******************
  myQuestionID: any;

  insertQuestion(name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {

    if (questionAr == null) { questionAr = ""; }
    if (questionAz == null) { questionAz = ""; }
    if (maxTime == null) { maxTime = 0; }
    if (descriptionEn == null) { descriptionEn = ""; }
    if (descriptionAr == null) { descriptionAr = ""; }

    // ****** insert Question ******
    if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {

      this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz,
        this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 3).then(data => {
          this.myQuestionID = this.showData(data);
          console.log('The inserted Question ID is: ' + this.myQuestionID);
          this.presentToast('The Question has been inserted. with the QuestionID: ' + this.myQuestionID);
        }, (err) => {
          alert(err);
        });
    } else {
      alert('Please fill the Required fields');
    }
  }


  // Insert Question Answer
  insertQuestionAnswer(tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz, text1, text2, text3, text4, text5, text6) {
    if (text3 == null) { text3 = ""; }
    if (text6 == null) { text6 = ""; }
    if (tblOneAz == null) { tblOneAz = ""; }
    if (tblTwoAz == null) { tblTwoAz = ""; }
    if (tblOneAr == null) { tblOneAr = ""; }
    if (tblTwoAr == null) { tblTwoAr = ""; }
    if (tblOneEn == null) { tblOneEn = ""; }
    if (tblTwoEn == null) { tblTwoEn = ""; }

    if ((text1 != null) && (text2 != null) && (text4 != null) && (text5 != null)) {
      // insert Question Answer to tbl_SelectionAnswersType
      let tblOneTexts = text1 + ',' + text2 + ',' + text3;
      let tblTwoTexts = text4 + ',' + text5 + ',' + text6;
      let myAnswerID;
      this.network.insertDragToTableAnswersType(this.myQuestionID, tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz,
        tblOneTexts, tblTwoTexts).then(data => {
          myAnswerID = this.showData(data);
          this.presentToast('The Question has been inserted. with the QuestionID: ' + this.myQuestionID + ' and AnswerID: ' + myAnswerID);
          console.log('The insertedDragDropAnswer ID is: ' + myAnswerID);
        }, (err) => {
          alert(err);
        });
    }
  }



}
