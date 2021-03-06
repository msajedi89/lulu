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
  selector: 'app-dragdroptypequestion',
  templateUrl: './dragdroptypequestion.page.html',
  styleUrls: ['./dragdroptypequestion.page.scss'],
})
export class DragdroptypequestionPage implements OnInit {

  // Selectable Variables
  mainTitles: any;
  mainTitle = null;
  subTitles: any;
  subTitle = null;

  // required variables for inserting Question
  myQuestionVoiceID: any;
  myQuestionImgID: any = 1;

  // required variables for Question's Image
  questionImg: any;

  // required variables for Choices Image
  fstChoiceImage: any;
  secChoiceImage: any;
  trdChoiceImage: any;

  // required variables for inserting Choices
  myFstImgID: any;
  mySecImgID: any;
  myTrdImgID: any;

  // required variables for Question's Audio
  recording: boolean = false;
  questionAudioFilePath: string;
  questionAudiofileName: string;
  questionAudio: MediaObject;
  myQuestionAudio: any;

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

    if (questionAr == null) { questionAr = ''; }
    if (questionAz == null) { questionAz = ''; }
    if (maxTime == null) { maxTime = 0; }
    if (descriptionEn == null) { descriptionEn = ''; }
    if (descriptionAr == null) { descriptionAr = ''; }

    if (this.myQuestionVoiceID == null) { this.myQuestionVoiceID = 1; }

    // ****** insert Question ******
    if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {

      this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz,
        this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 1).then(data => {
          this.myQuestionID = this.showData(data);
          console.log('The inserted Question ID is: ' + this.myQuestionID);
        }, (err) => {
          alert(err);
        });
    } else {
      alert('Please fill the Required fields');
    }
  }


  // Insert Question Answer
  insertQuestionAnswer(fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr, secChoiceAz, trdChoiceEn, trdChoiceAr, trdChoiceAz) {
    if (fstChoiceAz == null) { fstChoiceAz = ""; }
    if (fstChoiceAr == null) { fstChoiceAr = ""; }
    if (secChoiceAz == null) { secChoiceAz = ""; }
    if (secChoiceAr == null) { secChoiceAr = ""; }
    if (trdChoiceAz == null) { trdChoiceAz = ""; }
    if (trdChoiceAr == null) { trdChoiceAr = ""; }
    if (this.myFstImgID == null) { this.myFstImgID = 1; }
    if (this.mySecImgID == null) { this.mySecImgID = 1; }
    if (this.myTrdImgID == null) { this.myTrdImgID = 1; }

    if ((fstChoiceEn != null) && (secChoiceEn != null) && (trdChoiceEn != null)) {
      // insert Question Answer to tbl_SelectionAnswersType
      let myAnswerID;
      this.network.insertDragDropAnswersType(this.myQuestionID, fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr,
        secChoiceAz, trdChoiceEn, trdChoiceAr, trdChoiceAz, this.myFstImgID, this.mySecImgID, this.myTrdImgID).then(data => {

          myAnswerID = this.showData(data);
          this.presentToast('The Question has been inserted. with the QuestionID: ' + this.myQuestionID + ' and AnswerID: ' + myAnswerID);
          console.log('The insertedDragDropAnswer ID is: ' + myAnswerID);
        }, (err) => {
          alert(err);
        });
    }
  }

}
