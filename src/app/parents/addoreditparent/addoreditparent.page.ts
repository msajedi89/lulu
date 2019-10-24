import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const PARENTID = 'parentid';
const FORADDOREDIT = 'addoreditparent';

@Component({
  selector: 'app-addoreditparent',
  templateUrl: './addoreditparent.page.html',
  styleUrls: ['./addoreditparent.page.scss'],
})
export class AddoreditparentPage implements OnInit {

  parentStatus = false;
  parent: any = '';
  parentID = '';
  parentUsername = '';

  responseTxt = '';

  forAddOrEdit = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController) { }

  ngOnInit() {

    this.storage.get(FORADDOREDIT).then(forAddorEditResult => {
      this.forAddOrEdit = forAddorEditResult;
      console.log('Add or Edit State is: ' + this.forAddOrEdit);

      if (this.forAddOrEdit == 'edit') {
        this.storage.get(PARENTID).then(parentIDResult => {
          this.parentID = parentIDResult;
          console.log('the parentID is: ' + this.parentID);

          this.network.getParentByParentID(this.parentID).then(parentData => {
            const jsonArray = parentData;
            this.parent = jsonArray[0];
            console.log('the parent to edit is: ' + JSON.stringify(this.parent));

            this.parentUsername = this.parent.Username;
            if (this.parent.Status == true) {
              this.parentStatus = true;
            }
          }).catch(err => {
            alert(err);
          });
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['manageparents']);
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


  saveChanges(nameFamily, username, password, address, phone) {
    if (address == null) { address = ''; }
    if (phone == null) { phone = ''; }

    let parentStatusNumber = 0;
    if (this.parentStatus == true) {
      parentStatusNumber = 1;
    }

    // check NameFamily
    if ((nameFamily != null) && (nameFamily != '')) {
      // check Username
      if ((username != null) && (username != '')) {
        // check password
        if ((password != null) && (password != '')) {
          // check the duplication of username
          this.network.getParentByUsername(username).then(dupData => {
            const jsonArray = dupData;
            let parentDup = jsonArray[0];
            console.log('the parentDuplication result is: ' + JSON.stringify(parentDup));

            // the proccess of adding parent
            if (this.forAddOrEdit == 'add') {
              if (parentDup == '0') {
                // insert a new Parent
                // tslint:disable-next-line: max-line-length
                this.network.addOrEditParent(this.parentID, nameFamily, username, password, address, phone, parentStatusNumber, this.forAddOrEdit).then(insertingResult => {
                  console.log('the insertingResult is: ' + JSON.stringify(insertingResult));
                  this.presentToast('Parent inserted successfully...');
                }).catch(err => {
                  alert(err);
                });
              } else {
                alert('This Username exists, Please change it!');
              }
            } else {
              // the proccess of editing parent
              if (this.parentUsername == username) {
                // the username has NOT changed by teacher
                // Update the parent info. the username is the same as before
                // tslint:disable-next-line: max-line-length
                this.network.addOrEditParent(this.parentID, nameFamily, username, password, address, phone, parentStatusNumber, this.forAddOrEdit).then(updatingResult => {
                  console.log('the updatingResult is: ' + JSON.stringify(updatingResult));
                  this.presentToast('Your changes saved successfully...');
                }).catch(err => {
                  alert(err);
                });
              } else {
                // the username has changed by teacher
                if (parentDup == '0') {
                  // Update the parent info but the username changes
                  // tslint:disable-next-line: max-line-length
                  this.network.addOrEditParent(this.parentID, nameFamily, username, password, address, phone, parentStatusNumber, this.forAddOrEdit).then(updatingResult => {
                    console.log('the updatingResult is: ' + JSON.stringify(updatingResult));
                    this.presentToast('Your changes saved successfully...');
                  }).catch(err => {
                    alert(err);
                  });
                } else {
                  alert('This Username exists, Please change it!');
                }
              }
            }
          }).catch(err => {
            alert(err);
          });
        } else {
          alert('Please input Password!');
        }
      } else {
        alert('Please input Username!');
      }
    } else {
      alert('Please input Name & Family!');
    }
  }

}
