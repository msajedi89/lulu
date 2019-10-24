import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';

const SUBTITLE = 'subtitle';
const FORADDOREDIT = 'addoreditsubtitle';

@Component({
  selector: 'app-editsubtitle',
  templateUrl: './editsubtitle.page.html',
  styleUrls: ['./editsubtitle.page.scss'],
})
export class EditsubtitlePage implements OnInit {

  subTitleData: any = '';
  subTitle = '';
  subTitleOf = '';
  subTitleOfID: any = '';
  subTID: any = '';
  stStatus = false;

  forAddOrEdit = '';

  // the variables for select Main Title & Sub Title
  mainTitles: any;
  mainTitle = null;

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      // get the main titles for selection
      this.network.getAllMainTitles().then(mainTitlesData => {
        this.mainTitles = mainTitlesData;
        console.log('I recieved Main Titles: ' + JSON.stringify(this.mainTitles));
      });

      this.storage.get(FORADDOREDIT).then(forAddOrEditResult => {
        this.forAddOrEdit = forAddOrEditResult;

        if (this.forAddOrEdit == 'edit') {
          this.storage.get(SUBTITLE).then(subTID => {
            this.subTID = subTID;
            // get the Main Title By mtID
            this.network.getSubTitleByIDForManaging(subTID).then(data => {
              const jsonArray = data;
              this.subTitleData = jsonArray[0];
              this.subTitle = this.subTitleData.SubTitle;
              this.subTitleOf = this.subTitleData.MainTitle;
              this.subTitleOfID = this.subTitleData.SubTitleOf;
              this.stStatus = false;
              if (this.subTitleData.Status == '0') {
                this.stStatus = false;
              } else {
                this.stStatus = true;
              }
              console.log('the subTitleData is: ' + JSON.stringify(this.subTitleData));
            });
          });
        }
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'managesubtitle']);
  }

  userChanged(event: { component: IonicSelectableComponent, value: any }) {
    console.log('event: ', event);
    console.log('users: ', this.mainTitle);
  }

  // when select component has been closed.
  onClose() {
    this.subTitleOf = this.mainTitle.MainTitle;
    this.subTitleOfID = this.mainTitle.mtID;
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

  saveChanges(newSubTitle) {

    let subTitleStatus = 0;
    if (this.stStatus == true) {
      subTitleStatus = 1;
    }
    if ((newSubTitle != null) && (this.subTitleOfID != '')) {
      this.network.addOrEditSubTitle(this.subTID, newSubTitle, this.subTitleOfID, subTitleStatus, this.forAddOrEdit).then(result => {
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
