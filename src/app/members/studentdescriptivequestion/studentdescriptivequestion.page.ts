import { Component, OnInit } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
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
  selector: 'app-studentdescriptivequestion',
  templateUrl: './studentdescriptivequestion.page.html',
  styleUrls: ['./studentdescriptivequestion.page.scss'],
})
export class StudentdescriptivequestionPage implements OnInit {

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  questionImage = '';
  questionVoice: any;

  // required variables for Student Voice
  recording = false;
  stVoiceFilePath: string;
  stVoiceFileName = '';
  stVoice: MediaObject;
  myStudentVoice: any;

  // a variable to check if the voice has been uploaded or not
  voiceUploaded = false;

  // the variable for Rooting
  fromWhere: any;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public popoverCtrl: PopoverController,
    public navCtrl: NavController, public storage: Storage, private transfer: FileTransfer, private media: Media, private file: File) { }

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

      // get the question
      this.network.getQuestionByID(this.QID).then(data => {
        const jsonArray = data;
        this.question = jsonArray[0];
        console.log('the question QID: ' + this.question.QID);
        console.log('the QuestionImage: ' + this.question.QuestionImage);

        this.network.getImageByID(this.question.QuestionImage).then(imgData => {
          const jsonArray2 = imgData;
          let image = jsonArray2[0];
          console.log('the Image FileName: ' + image.Image);

          this.questionImage = this.network.mainUploadImgUrl + image.Image;

          // get the question Voice
          this.questionVoice = new Audio();
          this.questionVoice.src = this.network.mainQuestionVoicesUrl + this.question.VoiceEn;
          this.questionVoice.load();

          // get the descriptions for pop up
          this.descriptionEn = this.question.Description;
          this.descriptionAr = this.question.DescriptionAr;
        });
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


  // **************** Question Audio Part *****************


  // the method for starting the recorder to record audio
  startAudio() {
    if (this.platform.is('ios')) {
      this.stVoiceFileName = this.generateAudioFileName();
      this.stVoiceFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.stVoiceFileName;
      this.stVoice = this.media.create(this.stVoiceFilePath);
    } else if (this.platform.is('android')) {
      this.stVoiceFileName = this.generateAudioFileName();
      this.stVoiceFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.stVoiceFileName;
      this.stVoice = this.media.create(this.stVoiceFilePath);
    }
    this.stVoice.startRecord();
    this.recording = true;
  }

  // Generate the name by Datetime of system
  generateAudioFileName() {
    var d = new Date(), n = d.getTime(), newFileName = n + ".mp3";

    return newFileName;
  }

  // the method for stopping the recorder
  stopAudio() {
    this.stVoice.stopRecord();
    this.myStudentVoice = 'data:audio/mp3;base64, ' + this.stVoice;
    this.recording = false;
  }

  // the method for playing recorded Audio
  playAudio(file) {
    if (this.platform.is('ios')) {
      this.stVoiceFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.stVoice = this.media.create(this.stVoiceFilePath);
    } else if (this.platform.is('android')) {
      this.stVoiceFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.stVoice = this.media.create(this.stVoiceFilePath);
    }
    this.stVoice.play();
    this.stVoice.setVolume(0.8);
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

    fileTransfer.upload(audioFilePath, this.network.MainUploadStudentsVoiceAPI, options).then((data) => {
      alert('The Voice has been uploaded.');
    }, (err) => {
      console.log(err);
      alert(err);
    });
  }




  // **************** Record the Student's Answer *********************
  goNext(stAnswer) {

    // Upload the student voice if he/she record his/her voice
    if (this.stVoiceFileName != '') {
      this.uploadAudio(this.stVoiceFileName, this.stVoiceFilePath);
    }

    // record the result
    this.network.recordStudentDescriptiveAnswer(this.stExamID, this.stID, this.QID, stAnswer, this.stVoiceFileName, this.fromWhere).then(result => {
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
