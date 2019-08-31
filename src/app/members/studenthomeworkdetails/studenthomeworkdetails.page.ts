import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

const STUDENTHOMEID = 'homeid';
const LANGUAGE = 'language';

@Component({
  selector: 'app-studenthomeworkdetails',
  templateUrl: './studenthomeworkdetails.page.html',
  styleUrls: ['./studenthomeworkdetails.page.scss'],
})
export class StudenthomeworkdetailsPage implements OnInit {

  homework: any = '';

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

    this.storage.get(STUDENTHOMEID).then(homeID => {

      // get the student's Homeworks List
      this.network.getHomeworkListByID(homeID).then(homeworkData => {
        const jsonArray = homeworkData;
        this.homework = jsonArray[0];
        console.log('I received homeworkList: ' + JSON.stringify(this.homework));
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'studenthomeworks']);
  }

}
