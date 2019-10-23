import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LANGUAGE = 'language';
const LECTERNVIDEOQUESTIONS = 'lecternvideoquestions';
const LECTERNVIDEOIDFORSTUDENTWATCHING = 'lecternvideoidstudentwatch';

@Component({
  selector: 'app-studenttakelecternexam',
  templateUrl: './studenttakelecternexam.page.html',
  styleUrls: ['./studenttakelecternexam.page.scss'],
})
export class StudenttakelecternexamPage implements OnInit {

  videoQuestions: any = '';

  checkAnswer = false;

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

    // get the video Questions from storage
    this.storage.get(LECTERNVIDEOQUESTIONS).then(questionsData => {
      this.videoQuestions = questionsData;
      console.log('the videoQuestions from storage: ' + JSON.stringify(this.videoQuestions));
    });
  }

  goBack() {
    this.router.navigate(['lecterncategories']);
  }

  checkAnswers() {
    this.checkAnswer = true;
  }

}
