import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { async } from 'q';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-selectiontypequestions',
  templateUrl: './selectiontypequestions.page.html',
  styleUrls: ['./selectiontypequestions.page.scss'],
})
export class SelectiontypequestionsPage implements OnInit {

  // required variables for Question's Image
  questionImg: any;

  // required variables for Question's Audio
  recording: boolean = false;
  questionAudioFilePath: string;
  questionAudiofileName: string;
  questionAudio: MediaObject;
  myQuestionAudio: any;

  // the variables for select Main Title & Sub Title
  mainTitles: any;
  mainTitle = null;
  subTitles: any;
  subTitle = null;

  // ******* the variables for Selection Choice. ********
  // Main Variables:
  fstChoiceImage: any;
  secChoiceImage: any;
  trdChoiceImage: any;

  fstChoice = null;
  secChoice = null;
  trdChoice = null;

  fstAudioFileName: string;
  fstAudioFilePath: string;
  fstAudio: MediaObject;
  fstRecording: boolean = false;

  secAudioFileName: string;
  secAudioFilePath: string;
  secAudio: MediaObject;
  secRecording: boolean = false;

  trdAudioFileName: string;
  trdAudioFilePath: string;
  trdAudio: MediaObject;
  trdRecording: boolean = false;

  // Sub Main Variables:
  selectionChoices: any;

  fstNameEn: string;
  fstNameAr: string;
  fstNameAz: string;
  fstImage: string;
  fstVoice: string;

  secNameEn: string;
  secNameAr: string;
  secNameAz: string;
  secImage: string;
  secVoice: string;

  trdNameEn: string;
  trdNameAr: string;
  trdNameAz: string;
  trdImage: string;
  trdVoice: string;

  testVoiceID = null;

  // Multi Selection variable
  multi = true;

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, private camera: Camera, private file: File, private http: HttpClient,
    private webView: WebView, private storage: Storage, private plt: Platform,
    private loadingController: LoadingController, private ref: ChangeDetectorRef,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private transfer: FileTransfer, public navCtrl: NavController, private media: Media, public platform: Platform,
    private network: NetworkEngineService) { }

  ngOnInit() {
    this.platform.ready().then(() => {

      // get Main Titles
      this.network.getMainTitles().then(data => {
        console.log('I recieved Main Titles: ' + JSON.stringify(data));
        this.mainTitles = data;

        // get Selection Choices
        this.network.getSelectionChoices().then(data => {
          console.log('I recieved Selection Choices: ' + JSON.stringify(data));
          this.selectionChoices = data;
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'questions']);
  }

  // ***************** Main Title Select *****************
  getMainTitleID() {
    console.log('Chosen Main Title: ' + this.mainTitle.mtID);
  }


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

  // the method for opening the viewchild.
  openFromCode() {
    this.selectComponent.open();
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

  // **************** Question Image Part *****************

  // show an Action Sheet for choosing or taking image.
  async selectImage(root, imageName) {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source",
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.getPicture(root, imageName);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(root, imageName);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // get the picture from device camera.
  takePicture(root, imageName) {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    if (imageName != null) {
      this.camera.getPicture(options).then((imageData) => {
        if (root == "question") {
          this.questionImg = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.questionImg, imageName, root);
        } else if (root == "fstChoice") {
          this.fstChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.fstChoiceImage, imageName, root);
        } else if (root == "secChoice") {
          this.secChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.secChoiceImage, imageName, root);
        } else if (root == "trdChoice") {
          this.trdChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.trdChoiceImage, imageName, root);
        }
      }, (err) => {
        alert(err);
      });
    } else {
      alert("Please fill the related name for this image");
    }
  }

  // get the picture from device photo library.
  getPicture(root, imageName) {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    if (imageName != null) {
      this.camera.getPicture(options).then((imageData) => {
        if (root == "question") {

          this.questionImg = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.questionImg, imageName, root);

        } else if (root == "fstChoice") {

          this.fstChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.fstChoiceImage, imageName, root);

        } else if (root == "secChoice") {

          this.secChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.secChoiceImage, imageName, root);

        } else if (root == "trdChoice") {

          this.trdChoiceImage = 'data:image/jpeg;base64,' + imageData;
          // Insert & Upload Image
          this.insertImage(this.trdChoiceImage, imageName, root);
        }
      }, (err) => {
        alert(err);
      });
    } else {
      alert("Please fill the related name for this image");
    }
  }


  // the method for inserting Image.
  myQuestionImgID: any;
  myFstImgID: any;
  mySecImgID: any;
  myTrdImgID: any;

  insertImage(realImage, imgName, root) {
    let imageFileName = this.uploadImage(realImage);

    //let imageID;
    this.network.insertImage(imageFileName, imgName).then(data => {
      if (root == "question") {
        this.myQuestionImgID = this.showData(data);
      } else if (root == "fstChoice") {
        this.myFstImgID = this.showData(data);
      } else if (root == "secChoice") {
        this.mySecImgID = this.showData(data);
      } else if (root == "trdChoice") {
        this.myTrdImgID = this.showData(data);
      }

    }, (err) => {
      alert(err);
    });
  }

  // the method for uploading QuestionImage.
  uploadImage(image) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let imageFileName = this.createFileName();

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: imageFileName,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(image, this.network.mainUploadImgAPI, options).then((data) => {
      this.presentToast("the Image has been Uploaded");
    }, (err) => {
      alert(err);
    });

    return imageFileName;
  }

  // Generate the image name by Datetime of system
  createFileName() {
    var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";

    return newFileName;
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
      } else if (root == "fstChoice") {
        if (this.platform.is('ios')) {
          this.fstAudioFileName = this.generateAudioFileName();
          this.fstAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fstAudioFileName;
          this.fstAudio = this.media.create(this.fstAudioFilePath);
        } else if (this.platform.is('android')) {
          this.fstAudioFileName = this.generateAudioFileName();
          this.fstAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fstAudioFileName;
          this.fstAudio = this.media.create(this.fstAudioFilePath);
        }
        this.fstAudio.startRecord();
        this.fstRecording = true;
      } else if (root == "secChoice") {
        if (this.platform.is('ios')) {
          this.secAudioFileName = this.generateAudioFileName();
          this.secAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.secAudioFileName;
          this.secAudio = this.media.create(this.secAudioFilePath);
        } else if (this.platform.is('android')) {
          this.secAudioFileName = this.generateAudioFileName();
          this.secAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.secAudioFileName;
          this.secAudio = this.media.create(this.secAudioFilePath);
        }
        this.secAudio.startRecord();
        this.secRecording = true;
      } else if (root == "trdChoice") {
        if (this.platform.is('ios')) {
          this.trdAudioFileName = this.generateAudioFileName();
          this.trdAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.trdAudioFileName;
          this.trdAudio = this.media.create(this.trdAudioFilePath);
        } else if (this.platform.is('android')) {
          this.trdAudioFileName = this.generateAudioFileName();
          this.trdAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.trdAudioFileName;
          this.trdAudio = this.media.create(this.trdAudioFilePath);
        }
        this.trdAudio.startRecord();
        this.trdRecording = true;
      }
    } else {
      alert("Please fill the related name for inserting this voice!");
    }
  }

  // Generate the name by Datetime of system
  generateAudioFileName() {
    var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";

    return newFileName;
  }

  //the method for stopping the recorder
  stopAudio(root, voiceNameEn, voiceNameAr) {
    if ((voiceNameEn != null) && (voiceNameAr != null)) {
      if (root == "question") {
        this.questionAudio.stopRecord();
        this.myQuestionAudio = 'data:audio/m4a;base64, ' + this.questionAudio;
        this.recording = false;
        // Insert & Upload Question Voice
        this.insertVoice(this.questionAudiofileName, this.questionAudioFilePath, voiceNameEn, voiceNameAr, root);
      } else if (root == "fstChoice") {
        this.fstAudio.stopRecord();
        this.fstRecording = false;
        // Insert & Upload Question Voice
        this.insertVoice(this.fstAudioFileName, this.fstAudioFilePath, voiceNameEn, voiceNameAr, root);
      } else if (root == "secChoice") {
        this.secAudio.stopRecord();
        this.secRecording = false;
        // Insert & Upload Question Voice
        this.insertVoice(this.secAudioFileName, this.secAudioFilePath, voiceNameEn, voiceNameAr, root);
      } else if (root == "trdChoice") {
        this.trdAudio.stopRecord();
        this.trdRecording = false;
        // Insert & Upload Question Voice
        this.insertVoice(this.trdAudioFileName, this.trdAudioFilePath, voiceNameEn, voiceNameAr, root);
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
    } else if (root == "fstChoice") {
      if (this.platform.is('ios')) {
        this.fstAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.fstAudio = this.media.create(this.fstAudioFilePath);
      } else if (this.platform.is('android')) {
        this.fstAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.fstAudio = this.media.create(this.fstAudioFilePath);
      }
      this.fstAudio.play();
      this.fstAudio.setVolume(0.8);
    } else if (root == "secChoice") {
      if (this.platform.is('ios')) {
        this.secAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.secAudio = this.media.create(this.secAudioFilePath);
      } else if (this.platform.is('android')) {
        this.secAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.secAudio = this.media.create(this.secAudioFilePath);
      }
      this.secAudio.play();
      this.secAudio.setVolume(0.8);
    } else if (root == "trdChoice") {
      if (this.platform.is('ios')) {
        this.trdAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.trdAudio = this.media.create(this.trdAudioFilePath);
      } else if (this.platform.is('android')) {
        this.trdAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.trdAudio = this.media.create(this.trdAudioFilePath);
      }
      this.trdAudio.play();
      this.trdAudio.setVolume(0.8);
    }
  }


  // the method for inserting Voice
  myQuestionVoiceID: any;
  myFstVoiceID: any;
  mySecVoiceID: any;
  myTrdVoiceID: any;
  insertVoice(audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {

    // Upload Voice
    this.uploadAudio(audioFileName, audioFilePath);

    this.network.insertVoice(audioFileName, audioNameEn, audioNameAr).then(data => {
      if (root == "question") {
        this.myQuestionVoiceID = this.showData(data);
      } else if (root == "fstChoice") {
        this.myFstVoiceID = this.showData(data);
      } else if (root == "secChoice") {
        this.mySecVoiceID = this.showData(data);
      } else if (root == "trdChoice") {
        this.myTrdVoiceID = this.showData(data);
      }
      //alert("the ID of latest inserted Voice: " + voiceID);
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


  // ************** Selection Choices ****************

  // fill the First Choice after choosing the Selection Choice.
  onCloseFstChoice() {
    this.fstNameEn = this.fstChoice.NameEn;
    this.fstNameAr = this.fstChoice.NameAr;
    this.fstNameAz = this.fstChoice.NameAz;
    this.fstImage = this.network.mainUploadImgUrl + this.fstChoice.Image;
    this.fstVoice = this.fstChoice.VoiceEn;
  }

  // fill the Second Choice after Choosing the Selection Choice.
  onCloseSecChoice() {
    this.secNameEn = this.secChoice.NameEn;
    this.secNameAr = this.secChoice.NameAr;
    this.secNameAz = this.secChoice.NameAz;
    this.secImage = this.network.mainUploadImgUrl + this.secChoice.Image;
    this.secVoice = this.secChoice.VoiceEn;
  }

  // fill the Second Choice after Choosing the Selection Choice.
  onCloseTrdChoice() {
    this.trdNameEn = this.trdChoice.NameEn;
    this.trdNameAr = this.trdChoice.NameAr;
    this.trdNameAz = this.trdChoice.NameAz;
    this.trdImage = this.network.mainUploadImgUrl + this.trdChoice.Image;
    this.trdVoice = this.trdChoice.VoiceEn;
  }


  // *********** Correct Choices Section ***************

  // the choices for choosing the correct Choice.
  correctChoice = null;
  correctChoices = [
    {
      id: 1,
      choices: '1'
    },
    {
      id: 2,
      choices: '2'
    },
    {
      id: 3,
      choices: '3'
    },
    {
      id: 4,
      choices: '1,2'
    },
    {
      id: 5,
      choices: '1,3'
    },
    {
      id: 6,
      choices: '2,3'
    },
    {
      id: 7,
      choices: '1,2,3'
    }
  ];

  onCloseCorrectChoice() {
    console.log('The correct Choice/s is: ' + this.correctChoice.choices);
  }


  // **************** Prepare the Information for inserting ******************
  myFstChoiceID: any;
  mySecChoiceID: any;
  myTrdChoiceID: any;

  // Insert First Choice
  insertFstChoice(fstChoiceEn, fstChoiceAr, fstChoiceAz) {
    if (fstChoiceEn == null) { fstChoiceEn = ""; }
    if (fstChoiceAr == null) { fstChoiceAr = ""; }
    if (fstChoiceAz == null) { fstChoiceAz = ""; }
    if (this.myFstImgID == null) { this.myFstImgID = 1; }
    if (this.myFstVoiceID == null) { this.myFstVoiceID = 1; }

    if (this.fstChoice == null) {
      this.network.insertSelectionCoice(fstChoiceEn, fstChoiceAr, fstChoiceAz, this.myFstImgID, this.myFstVoiceID).then(data => {
        this.myFstChoiceID = this.showData(data);
        console.log('the myFstChoiceID is: ' + this.myFstChoiceID);
        this.presentToast('First Choice has been inserted successfully...');
      }, (err) => {
        alert(err);
      });
    } else {
      this.myFstChoiceID = this.fstChoice.SID;
    }
  }

  // Insert Second Choice
  insertSecChoice(secChoiceEn, secChoiceAr, secChoiceAz) {
    if (secChoiceEn == null) { secChoiceEn = ""; }
    if (secChoiceAr == null) { secChoiceAr = ""; }
    if (secChoiceAz == null) { secChoiceAz = ""; }
    if (this.mySecImgID == null) { this.mySecImgID = 1; }
    if (this.mySecVoiceID == null) { this.mySecVoiceID = 1; }

    if (this.secChoice == null) {
      this.network.insertSelectionCoice(secChoiceEn, secChoiceAr, secChoiceAz, this.mySecImgID, this.mySecVoiceID).then(data => {
        this.mySecChoiceID = this.showData(data);
        console.log('the mySecChoiceID is: ' + this.mySecChoiceID);
        this.presentToast('Second Choice has been inserted successfully...');
      }, (err) => {
        alert(err);
      });
    } else {
      this.mySecChoiceID = this.secChoice.SID;
    }
  }

  // Insert Third Choice
  insertTrdChoice(trdChoiceEn, trdChoiceAr, trdChoiceAz) {
    if (trdChoiceEn == null) { trdChoiceEn = ""; }
    if (trdChoiceAr == null) { trdChoiceAr = ""; }
    if (trdChoiceAz == null) { trdChoiceAz = ""; }
    if (this.myTrdImgID == null) { this.myTrdImgID = 1; }
    if (this.myTrdVoiceID == null) { this.myTrdVoiceID = 1; }

    if (this.trdChoice == null) {
      this.network.insertSelectionCoice(trdChoiceEn, trdChoiceAr, trdChoiceAz, this.myTrdImgID, this.myTrdVoiceID).then(data => {
        this.myTrdChoiceID = this.showData(data);
        console.log('the myTrdChoiceID is: ' + this.myTrdChoiceID);
        this.presentToast('Third Choice has been inserted successfully...');
      }, (err) => {
        alert(err);
      });
    } else {
      this.myTrdChoiceID = this.trdChoice.SID;
    }
  }


  // **************** the Inserting Question Section ******************
  myQuestionID: any;

  insertQuestion(name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {

    if (questionAr == null) { questionAr = ""; }
    if (questionAz == null) { questionAz = ""; }
    if (maxTime == null) { maxTime = 0; }
    if (descriptionEn == null) { descriptionEn = ""; }
    if (descriptionAr == null) { descriptionAr = ""; }
    if (this.myQuestionVoiceID == null) { this.myQuestionVoiceID = 1; }
    if (this.myQuestionImgID == null) { this.myQuestionImgID = 1; }

    // ****** insert Question ******
    if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {

      this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz,
        this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 2).then(data => {
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



  // **************** the Inserting Question Answer ******************
  insertQuestionAnswer() {
    if (this.myFstChoiceID == null) { this.myFstChoiceID = 1; }
    if (this.mySecChoiceID == null) { this.mySecChoiceID = 1; }
    if (this.myTrdChoiceID == null) { this.myTrdChoiceID = 1; }

    let multiSelection;
    if (this.multi === true) {
      multiSelection = 1;
    } else {
      multiSelection = 0;
    }

    console.log('The multi is: ' + this.multi);
    console.log('The multiSelection is: ' + multiSelection);

    // insert Question Answer to tbl_SelectionAnswersType
    let myAnswerID;
    this.network.insertSelectionAnswer(this.myQuestionID, multiSelection, this.myFstChoiceID, this.mySecChoiceID, this.myTrdChoiceID, this.correctChoice.choices).then(data => {
      myAnswerID = this.showData(data);
      this.presentToast('The Question has been inserted. with the QuestionID: ' + this.myQuestionID + ' and AnswerID: ' + myAnswerID);
      console.log('The insertSelectionAnswer ID is: ' + myAnswerID);
    }, (err) => {
      alert(err);
    });
  }


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
