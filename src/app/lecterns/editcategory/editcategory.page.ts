import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const LECTERNCATEGORY = 'lecterncategory';
const FORADDOREDIT = 'addoreditlecterncategory';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.page.html',
  styleUrls: ['./editcategory.page.scss'],
})
export class EditcategoryPage implements OnInit {

  lecternCategory: any = '';
  category = '';
  lecID: any = '';
  catStatus = false;

  forAddOrEdit = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.storage.get(FORADDOREDIT).then(forAddOrEditResult => {
        this.forAddOrEdit = forAddOrEditResult;

        if (this.forAddOrEdit == 'edit') {
          this.storage.get(LECTERNCATEGORY).then(lecIdResult => {
            this.lecID = lecIdResult;

            // get the Category By LecID
            this.network.getLecternCategoryByID(this.lecID).then(data => {
              const jsonArray = data;
              this.lecternCategory = jsonArray[0];
              console.log('the lecternCategory is: ' + JSON.stringify(this.lecternCategory));

              this.category = this.lecternCategory.Category;
              this.catStatus = false;
              if (this.lecternCategory.Status == '0') {
                this.catStatus = false;
              } else {
                this.catStatus = true;
              }
            });
          });
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['managecategories']);
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

  saveChanges(newCategory) {

    let categoryStatus = 1;
    if(this.catStatus == false) {
      categoryStatus = 0;
    } else {
      categoryStatus = 1;
    }
    console.log('the catStatus is: ' + this.catStatus);
    if (newCategory != null) {
      this.network.addOrEditLecternCategory(this.lecID, newCategory, categoryStatus, this.forAddOrEdit).then(result => {
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
