import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const MAINTITLE = 'maintitleid';
const SUBTITLE = 'subtitleid';
const LECTERNQUESTIONID = 'lecternqid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-lecternquestionspage',
  templateUrl: './lecternquestionspage.page.html',
  styleUrls: ['./lecternquestionspage.page.scss'],
})
export class LecternquestionspagePage implements OnInit {

  mainTitle: any = '';
  subTitle: any = '';
  questionsList: any = '';

  language = '';

  constructor(private storage: Storage, private router: Router, public platform: Platform, private network: NetworkEngineService,
    public navCtrl: NavController) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get Chosen mtID
    this.storage.get(MAINTITLE).then(mtID => {
      // get Chosen subTID
      this.storage.get(SUBTITLE).then(subTID => {
        // get Chosen Main Title by its ID
        this.network.getMainTitleByID(mtID).then(maintitleData => {
          const jsonArray = maintitleData;
          this.mainTitle = jsonArray[0];
          console.log('the maintitle is: ' + JSON.stringify(this.mainTitle));
        });

        // get Sub Title
        this.network.getSubTitleByID(subTID).then(subTitleData => {
          const jsonArray2 = subTitleData;
          this.subTitle = jsonArray2[0];
          console.log('the subTitles: ' + JSON.stringify(this.subTitle));
        });

        // get the Questions
        this.network.get100QuestionsFilterByTitle(mtID, subTID).then(questionData => {
          this.questionsList = questionData;
          console.log('the questionsList: ' + JSON.stringify(this.questionsList));
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'lecternsubtitlepage']);
  }

  goToQuestion(questionType, qID) {
    console.log('the questionType is: ' + questionType);
    this.storage.set(LECTERNQUESTIONID, qID).then(() => {
      switch (questionType) {
        case '1':
          this.router.navigate(['members', 'lecterndragdropquestion']);
          break;
        case '2':
          this.router.navigate(['members', 'lecternselectivequestion']);
          break;
        case '3':
          this.router.navigate(['members', 'lecterndragtablequestion']);
          break;
        case '4':
          this.router.navigate(['members', 'lecterndescriptivequestion']);
          break;
        case '5':
          this.router.navigate(['members', 'lecterndrawingquestion']);
          break;
        case '6':
          this.router.navigate(['members', 'lecternrecitequranquestion']);
          break;

        default:
          break;
      }
    });
  }

}
