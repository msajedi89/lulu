import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';

const LECTERNVIDEOIDFORADD = 'lecternvideoidforadd';
const FROMWHEREINLECTERNVIDEOS = 'fromwhere';

@Component({
  selector: 'app-addvideoquestions',
  templateUrl: './addvideoquestions.page.html',
  styleUrls: ['./addvideoquestions.page.scss'],
})
export class AddvideoquestionsPage implements OnInit {

  videoID = '';
  lecternVideo: any = '';
  videoSrc = '';
  videoQuestions: Array<string> = [];

  fromWhere = '';

  constructor(private router: Router, public platform: Platform, public navCtrl: NavController, public storage: Storage,
    private network: NetworkEngineService, private toastController: ToastController) { }

  ngOnInit() {

    // fetch the VideoID from storage
    this.storage.get(LECTERNVIDEOIDFORADD).then(videoIDResult => {
      this.videoID = videoIDResult;
      console.log('the videoID for inserting Question for it: ' + this.videoID);

      // get the video info
      this.network.getLecternVideoByVideoID(this.videoID).then(videoData => {
        const jsonArray = videoData;
        this.lecternVideo = jsonArray[0];
        console.log('the lectern video info is: ' + JSON.stringify(this.lecternVideo));

        this.videoSrc = this.network.mainLecternVideoURL + this.lecternVideo.VideoURL;
      }).catch(err => {
        alert(err);
      });

      // get the video Questions
      this.network.getLecternVideoQuestionsByVideoID(this.videoID).then(questionsData => {

        console.log('the questionsData is: ' + JSON.stringify(questionsData));
        if(questionsData != '0 result') {
          questionsData.forEach(element => {
            this.videoQuestions.push(JSON.stringify(element.MainTitle));
          });
        }

        console.log('the videoQuestions Array: ' + this.videoQuestions);
      }).catch(err => {
        alert(err);
      });
    });

    // determine where to go back
    this.storage.get(FROMWHEREINLECTERNVIDEOS).then(fromWhereResult => {
      this.fromWhere = fromWhereResult;
      console.log('from where: ' + this.fromWhere);
    });
  }

  goBack() {
    if (this.fromWhere == 'uploadlecternvideo') {
      this.router.navigate(['lecternmainpage']);
    } else if (this.fromWhere == 'lecterncategoryvideos') {
      this.router.navigate(['lecterncategoryvideos']);
    }
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


  // ************* Add Question to this Video ***************

  addQuestion(mainTitle, subTitle, answer) {
    if (subTitle == null) { subTitle = ''; }
    if (answer == null) { answer = ''; }

    if ((mainTitle != '') && (mainTitle != null)) {
      this.network.insertQuestionForLecternVideo(this.videoID, mainTitle, subTitle, answer).then(insertingResult => {
        console.log('the inserting Result is: ' + JSON.stringify(insertingResult));
        this.videoQuestions.push(mainTitle);
        this.presentToast('Your Question inserted successfully..');
      }).catch(err => {
        alert(err);
      });
    } else {
      alert('Please fill the Main Title!');
    }
  }

}
