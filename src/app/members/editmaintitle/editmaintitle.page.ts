import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const MAINTITLE = 'maintitle';
const FORADDOREDIT = 'addoreditmaintitle';

@Component({
  selector: 'app-editmaintitle',
  templateUrl: './editmaintitle.page.html',
  styleUrls: ['./editmaintitle.page.scss'],
})
export class EditmaintitlePage implements OnInit {

  mainTitleData: any = '';
  mainTitle = '';
  mtID: any = '';
  mtStatus = false;

  forAddOrEdit = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.storage.get(FORADDOREDIT).then(forAddOrEditResult => {
        this.forAddOrEdit = forAddOrEditResult;

        if (this.forAddOrEdit == 'edit') {
          this.storage.get(MAINTITLE).then(mtID => {
            this.mtID = mtID;
            // get the Main Title By mtID
            this.network.getMainTitleByID(mtID).then(data => {
              const jsonArray = data;
              this.mainTitleData = jsonArray[0];
              this.mainTitle = this.mainTitleData.MainTitle;
              this.mtStatus = false;
              if (this.mainTitleData.Status == '0') {
                this.mtStatus = false;
              } else {
                this.mtStatus = true;
              }
              console.log('the this.mainTitleData.Status is: ' + this.mainTitleData.Status);
              console.log('the mainTitleData is: ' + JSON.stringify(this.mainTitleData));
            });
          });
        }
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'managemaintitle']);
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

  saveChanges(newMainTitle) {
    console.log('the mtStatus is: ' + this.mtStatus);
    if (newMainTitle != null) {
      this.network.addOrEditMainTitle(this.mtID, newMainTitle, this.mtStatus, this.forAddOrEdit).then(result => {
        this.presentToast('Your data has been saved..');
        console.log('the result of saving is: ' + JSON.stringify(result));
      }, (err) => {
        alert(err);
      });
    } else {
      alert('Please fill the required field');
    }
  }

}
