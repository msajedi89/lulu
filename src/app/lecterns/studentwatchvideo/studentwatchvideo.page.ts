import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LANGUAGE = 'language';
const LECTERNVIDEOIDFORSTUDENTWATCHING = 'lecternvideoidstudentwatch';
const LECTERNVIDEOQUESTIONS = 'lecternvideoquestions';

@Component({
  selector: 'app-studentwatchvideo',
  templateUrl: './studentwatchvideo.page.html',
  styleUrls: ['./studentwatchvideo.page.scss'],
})
export class StudentwatchvideoPage implements OnInit {

  videoID = '';
  lecternVideo: any = '';
  videoSrc = '';

  videoQuestions: any = '';
  hasExam = false;

  // Settings variables
  language = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage,
    private network: NetworkEngineService) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // fetch the VideoID from storage
    this.storage.get(LECTERNVIDEOIDFORSTUDENTWATCHING).then(videoIDResult => {
      this.videoID = videoIDResult;
      console.log('the videoID is : ' + this.videoID);

      // get the video info
      this.network.getLecternVideoByVideoID(this.videoID).then(videoData => {
        const jsonArray = videoData;
        this.lecternVideo = jsonArray[0];
        console.log('the lectern video info is: ' + JSON.stringify(this.lecternVideo));

        this.videoSrc = this.network.mainLecternVideoURL + this.lecternVideo.VideoURL;
      }).catch(err => {
        alert(err);
      });

      // check this video has questions.
      this.network.getLecternVideoQuestionsByVideoIDForStudent(this.videoID).then(videoQuestionsData => {
        this.videoQuestions = videoQuestionsData;
        console.log('the videoQuestions are: ' + JSON.stringify(this.videoQuestions));

        if (this.videoQuestions != '0 result') {
          this.hasExam = true;
        }
      }).catch(err => {
        alert(err);
      });
    });
  }

  goBack() {
    this.router.navigate(['lecterncategoryvideos']);
  }

  takeExam() {
    this.storage.set(LECTERNVIDEOQUESTIONS, this.videoQuestions).then(() => {
      this.router.navigate(['studenttakelecternexam']);
    });
  }

}
