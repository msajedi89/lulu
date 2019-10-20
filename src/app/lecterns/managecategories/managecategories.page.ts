import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const LECTERNCATEGORY = 'lecterncategory';
const FORADDOREDIT = 'addoreditlecterncategory';

@Component({
  selector: 'app-managecategories',
  templateUrl: './managecategories.page.html',
  styleUrls: ['./managecategories.page.scss'],
})
export class ManagecategoriesPage implements OnInit {

  lecternCategories: any = '';
  mySearch = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    // get the list of all Main Titles
    this.network.getAllLecternCategories().then(categoriesData => {
      this.lecternCategories = categoriesData;
      console.log('I recieved lectern Categories: ' + JSON.stringify(this.lecternCategories));
    });
  }

  goBack() {
    this.router.navigate(['lecternmainpage']);
  }

  // Filter Category
  updateCategories() {
    if (this.mySearch != '') {
      console.log('my Search: ' + this.mySearch);
      this.network.filterLecternCategoris(this.mySearch).then(data => {
        console.log('I recieved filtered Categories: ' + JSON.stringify(data));
        this.lecternCategories = data;
      });
    } else {
      this.network.getAllLecternCategories().then(data => {
        this.lecternCategories = data;
      });
    }
  }

  goForEditing(lecID) {
    this.storage.set(FORADDOREDIT, 'edit').then(() => {
      this.storage.set(LECTERNCATEGORY, lecID).then(result => {
        console.log('the result of lecID in storage: ' + result);
        this.router.navigate(['editcategory']);
      });
    });
  }

  goToAddCategory() {
    this.storage.set(FORADDOREDIT, 'add').then(() => {
      this.router.navigate(['editcategory']);
    });
  }

}
