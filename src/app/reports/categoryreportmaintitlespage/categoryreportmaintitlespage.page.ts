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
  selector: 'app-categoryreportmaintitlespage',
  templateUrl: './categoryreportmaintitlespage.page.html',
  styleUrls: ['./categoryreportmaintitlespage.page.scss'],
})
export class CategoryreportmaintitlespagePage implements OnInit {

  language = '';

  mainTitles: any = '';
  stID = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage, 
    private network: NetworkEngineService) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
   }

  ngOnInit() {

    this.storage.get(STIDFORREPORTS).then(stIDResult => {
      this.stID = stIDResult;
      this.network.getStudentCategoryReportMainTitles(this.stID).then(mainTitlesData => {
        this.mainTitles = mainTitlesData;
        console.log('the distinct Main Titles: ' + JSON.stringify(this.mainTitles));

        if(this.mainTitles == '0 result') {
          alert('Student has not take an exam yet.');
        }
      }).catch(err => {
        alert(err);
      });
    });
  }

  goBack() {
    this.router.navigate(['members', 'studentreports']);
  }


  goToCategoryQuestionList(category) {
    console.log('the category chosen: ' + category.mtID);

    this.storage.set(CATEGORYFORCATEGORYREPORT, category).then(() => {
      this.router.navigate(['catreportmaintitlequestionslist']);
    });
  }

}
