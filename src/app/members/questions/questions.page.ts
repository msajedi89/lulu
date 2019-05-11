import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  qIds: any[];
  qEn: any[];

  constructor(private router: Router, public navCtrl: NavController,
    private network: NetworkEngineService) {
      this.get100LatestQuestions();
    }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['members' , 'teacherdash']);
  }

  goToSelectionTypeQuestions() {
    this.router.navigate(['members' , 'selectiontypequestions']);
  }

  goToDragDropTypeQuestions() {
    this.router.navigate(['members' , 'dragdroptypequestion']);
  }

  goToDragToTableTypeQuestions() {
    this.router.navigate(['members' , 'dragtotabletypequestion']);
  }

  goToAnswersTypeQuestions() {
    this.router.navigate(['members' , 'answertypequestions']);
  }

  goToDrawLetterTypeQuestions() {
    this.router.navigate(['members' , 'drawletterquestion']);
  }

  goToReciteTheQuranTypeQuestions() {
    this.router.navigate(['members' , 'recitethequran']);
  }

  // Get the 100 Latest Question from server Method
  get100LatestQuestions() {
    this.network.get100LatestQuestions().then(data => {
      this.showData(data);
      console.log('I Received: ' + JSON.stringify(data));
    });
  }

  showData(data) {
    let jsonArray = data;

    this.qIds = [];
    this.qEn = [];

    for (let i = 0; i < jsonArray.length; i++) {
      let jsonObject = jsonArray[i];
      this.qIds.push(jsonObject.QID);
      this.qEn.push(jsonObject.Question);
    }

  }

}
