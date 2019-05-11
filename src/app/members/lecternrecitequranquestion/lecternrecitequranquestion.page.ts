import { Component, OnInit } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';

const LECTERNQUESTIONID = 'lecternqid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-lecternrecitequranquestion',
  templateUrl: './lecternrecitequranquestion.page.html',
  styleUrls: ['./lecternrecitequranquestion.page.scss'],
})
export class LecternrecitequranquestionPage implements OnInit {

  QID: any;

  question: any = '';
  questionVoice: any;

  // required variables for Student Voice
  recording = false;
  stVoiceFilePath: string;
  stVoiceFileName = '';
  stVoice: MediaObject;
  myStudentVoice: any;

  // a variable to check if the voice has been uploaded or not
  voiceUploaded = false;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public popoverCtrl: PopoverController,
    public navCtrl: NavController, public storage: Storage, private transfer: FileTransfer, private media: Media, private file: File) { }

  ngOnInit() {

    // get the Question ID
    this.storage.get(LECTERNQUESTIONID).then(resultQID => {
      this.QID = resultQID;

      // get the question
      this.network.getQuestionByID(this.QID).then(data => {
        const jsonArray = data;
        this.question = jsonArray[0];
        console.log('the question QID: ' + this.question.QID);

        // get the question Voice
        this.questionVoice = new Audio();
        this.questionVoice.src = this.network.mainQuestionVoicesUrl + this.question.VoiceEn;
        this.questionVoice.load();

        // get the descriptions for pop up
        this.descriptionEn = this.question.Description;
        this.descriptionAr = this.question.DescriptionAr;
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

}
