import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-recitethequran',
  templateUrl: './recitethequran.page.html',
  styleUrls: ['./recitethequran.page.scss'],
})
export class RecitethequranPage implements OnInit {

  // Selectable Variables
  mainTitles: any;
  mainTitle = null;
  subTitles: any;
  subTitle = null;

  // required variables for Question's Audio
  recording: boolean = false;
  questionAudioFilePath: string;
  questionAudiofileName: string;
  questionAudio: MediaObject;
  myQuestionAudio: any;

  // required variables for inserting Question
  myQuestionVoiceID: any;
  myQuestionImgID: any = 1;


  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, private toastController: ToastController,
    private actionSheetController: ActionSheetController, private camera: Camera, private transfer: FileTransfer, public navCtrl: NavController,
    private media: Media, private file: File) { }

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




  // **************** Question Audio Part *****************


  // the method for starting the recorder to record audio
  startAudio(root, voiceNameEn, voiceNameAr) {
    if ((voiceNameEn != null) && (voiceNameAr != null)) {
      if (root == "question") {
        if (this.platform.is('ios')) {
          this.questionAudiofileName = this.generateAudioFileName();
          this.questionAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.questionAudiofileName;
          this.questionAudio = this.media.create(this.questionAudioFilePath);
        } else if (this.platform.is('android')) {
          this.questionAudiofileName = this.generateAudioFileName();
          this.questionAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.questionAudiofileName;
          this.questionAudio = this.media.create(this.questionAudioFilePath);
        }
        this.questionAudio.startRecord();
        this.recording = true;
      }
    } else {
      alert("Please fill the related name for inserting this voice!");
    }
  }

  // Generate the name by Datetime of system
  generateAudioFileName() {
    var d = new Date(), n = d.getTime(), newFileName = n + ".mp3";

    return newFileName;
  }


  //the method for stopping the recorder
  stopAudio(root, voiceNameEn, voiceNameAr) {
    if ((voiceNameEn != null) && (voiceNameAr != null)) {
      if (root == "question") {
        this.questionAudio.stopRecord();
        this.myQuestionAudio = 'data:audio/mp3;base64, ' + this.questionAudio;
        this.recording = false;
        // Insert & Upload Question Voice
        this.insertVoice(this.questionAudiofileName, this.questionAudioFilePath, voiceNameEn, voiceNameAr, root);
      }
    }
  }


  // the method for playing recorded Audio
  playAudio(file, root) {
    if (root == "question") {
      if (this.platform.is('ios')) {
        this.questionAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.questionAudio = this.media.create(this.questionAudioFilePath);
      } else if (this.platform.is('android')) {
        this.questionAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.questionAudio = this.media.create(this.questionAudioFilePath);
      }
      this.questionAudio.play();
      this.questionAudio.setVolume(0.8);
    }
  }


  // the method for inserting Voice
  insertVoice(audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {

    // Upload Voice
    this.uploadAudio(audioFileName, audioFilePath);

    this.network.insertVoice(audioFileName, audioNameEn, audioNameAr).then(data => {
      if (root == "question") {
        this.myQuestionVoiceID = this.showData(data);
      }
    }, (err) => {
      alert(err);
    });
  }

  // the method for uploading voice recordings
  uploadAudio(audioFileName, audioFilePath) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'audio',
      fileName: audioFileName,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'audio/mp3',
      headers: {}
    }

    fileTransfer.upload(audioFilePath, this.network.mainUploadVoiceAPI, options).then((data) => {
      this.presentToast("The Audio has been uploaded.");
    }, (err) => {
      console.log(err);
      alert(err);
    });
  }




  // **************** the Inserting Question Section ******************

  insertQuestion(name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {

    if (questionAr == null) { questionAr = ""; }
    if (questionAz == null) { questionAz = ""; }
    if (maxTime == null) { maxTime = ""; }
    if (descriptionEn == null) { descriptionEn = ""; }
    if (descriptionAr == null) { descriptionAr = ""; }
    if (this.myQuestionVoiceID == null) { this.myQuestionVoiceID = 1; }

    // ****** insert Question ******
    if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {
      let myQuestionID;
      this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz,
        this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 6).then(data => {
          myQuestionID = this.showData(data);
          console.log("The inserted Question ID is: " + myQuestionID);
          this.presentToast("A new Question with this ID: " + myQuestionID + " has been inserted.");
        }, (err) => {
          alert(err);
        });
    } else {
      alert("Please fill the Required fields");
    }
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

}
