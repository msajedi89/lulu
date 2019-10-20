import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LANGUAGE = 'language';
const WHOIS = 'whois';
const STIDFORREPORTS = 'stidforreports';
const CATEGORYFORCATEGORYREPORT = 'categoryforcategoryreport';

@Component({
  selector: 'app-catreportmaintitlequestionslist',
  templateUrl: './catreportmaintitlequestionslist.page.html',
  styleUrls: ['./catreportmaintitlequestionslist.page.scss'],
})
export class CatreportmaintitlequestionslistPage implements OnInit {

  language = '';

  category: any = '';
  stID = '';
  mtID = '';

  questionsList: any = '';

  avgEvaluation = 0;

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage,
    private network: NetworkEngineService) {
    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get the stID for feching its question list
    this.storage.get(STIDFORREPORTS).then(stIDResult => {
      this.stID = stIDResult;
      console.log('the stID for fetching Questions list: ' + this.stID);

      // get the mtId for fetching the questions list filter by this main title
      this.storage.get(CATEGORYFORCATEGORYREPORT).then(categoryResult => {
        this.category = categoryResult;
        this.mtID = this.category.mtID;
        console.log('the mtID for fetching Questions list: ' + this.mtID);

        // fetch the Questions list
        this.network.getStCategoryReportQuestionsList(this.stID, this.mtID).then(questionsListData => {
          this.questionsList = questionsListData;
          console.log('the questionsList: ' + JSON.stringify(this.questionsList));

          // Calculate the average of Eavaluations Score
          this.avgEvaluation = this.calcEvaluationAverage(this.questionsList);
          console.log('the avgEvaluation: ' + this.avgEvaluation);
        }).catch(err => {
          alert(err);
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['categoryreportmaintitlespage']);
  }

  calcEvaluationAverage(questionsList) {
    let sum = 0;
    let scoreCount = 0;
    let score = 0;
    for (let i = 0; i < questionsList.length; i++) {
      const element = questionsList[i];
      console.log('the element is: ' + JSON.stringify(element.EvaluationState));
      
      // check if the question Evaluated by teacher or not
      if((element.EvaluationState != null) && (element.EvaluationState != '')) {
        score = parseInt(element.EvaluationState);
        sum = sum + score;
        scoreCount++;
        score = 0;
      }
    }

    let avg = sum / scoreCount;
    avg = Math.round(avg * 100) / 100;
    return avg;
  }

}
