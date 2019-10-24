import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const PARENTID = 'parentid';
const FORADDOREDIT = 'addoreditparent';

@Component({
  selector: 'app-manageparents',
  templateUrl: './manageparents.page.html',
  styleUrls: ['./manageparents.page.scss'],
})
export class ManageparentsPage implements OnInit {

  allParents: any;
  mySearch = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {

    // get the list of all Parents
    this.network.getAllParentsForManaging().then(parentsData => {
      this.allParents = parentsData;
      console.log('the allParents: ' + JSON.stringify(this.allParents));
    });
  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
  }

  // Filter Parents
  updateParents(){
    if(this.mySearch != '') {
      console.log('my Search: ' + this.mySearch);
      this.network.filterParentsForManaging(this.mySearch).then(data => {
        console.log('I recieved Parents: ' + JSON.stringify(data));
        this.allParents = data;
      });
    } else {
      this.network.getAllParentsForManaging().then(data => {
        console.log('I recieved Parents: ' + JSON.stringify(data));
        this.allParents = data;
      });
    }
  }

  showParentDetails(parentID) {
    this.storage.set(FORADDOREDIT, 'edit').then(() => {
      this.storage.set(PARENTID, parentID).then(result => {
        // console.log('the parentID in storage: ' + result);
        this.router.navigate(['addoreditparent']);
      });
    });
  }

  goToAddParent() {
    this.storage.set(FORADDOREDIT, 'add').then(() => {
      this.router.navigate(['addoreditparent']);
    });
  }

}
