import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  parent: any = '';
  responseTxt = '';

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['home']);
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

  register(nameFamily, username, password, address, phone) {

    if (address == null) { address = ''; }
    if (phone == null) { phone = ''; }

    if ((nameFamily != null) && (username != null) && (password != null)) {
      this.responseTxt = '';

      // Check the Duplication of username
      this.network.getParentByUsername(username).then(parentData => {
        const jsonArray = parentData;
        this.parent = jsonArray[0];
        console.log('I Received parent: ' + JSON.stringify(this.parent));

        // check the Dublication of username
        if (this.parent == '0') {
          this.network.addOrEditParent(1, nameFamily, username, password, address, phone, 1, 'add').then(result => {
            this.responseTxt = '';
            this.presentToast('You signed up successfully...');
            console.log(JSON.stringify(result));
          }).catch(error => {
            alert(error);
          });
        } else {
          this.responseTxt = 'This Username has registered before!';
        }
      }).catch(error => {
        alert(error);
      });
    } else {
      this.responseTxt = 'Please fill the required fields!';
    }
  }

}
