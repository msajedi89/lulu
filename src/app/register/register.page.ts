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

  student: any = '';
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

  register(nameFamily, username, password, address, birthdate) {

    if (address == null) { address = ''; }
    if (birthdate == null) { birthdate = '1991-05-08'; }

    if ((nameFamily != null) && (username != null) && (password != null)) {
      this.responseTxt = '';

      this.network.getStudentByUsername(username).then(studentData => {
        const jsonArray = studentData;
        this.student = jsonArray[0];
        console.log('I Received student: ' + JSON.stringify(this.student));

        // check the Dublication of username
        if (this.student == '0') {
          this.network.addOrEditStudent(1, nameFamily, username, password, address, birthdate, 1, 'default-user.jpg', 'add').then(result => {
            this.presentToast('You registered successfully..');
            console.log('the result of saving is: ' + JSON.stringify(result));
            this.router.navigate(['home']);
          }, (err) => {
            alert(err);
          });
        } else {
          alert('This Username has registered before!');
          this.responseTxt = 'This Username has registered before!';
        }
      })
    } else {
      alert('Please fill the required field');
      this.responseTxt = 'Please fill the required fields!';
    }
  }

}
