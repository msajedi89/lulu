import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const LANGUAGE = 'language';
const PARENT = 'parent';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddstudentPage implements OnInit {

  parentID = '';
  parent: any = '';

  student: any = '';
  studentProfileImageName = 'default-user.jpg';

  language = '';
  profileImg: any = '../../../assets/imgs/default-user.jpg';

  fromDevice = false;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController, private actionSheetController: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer) {

    // get the language from storage and set the dashboard language
    this.storage.get(LANGUAGE).then(resultLanguage => {
      this.language = resultLanguage;
      console.log('the language is: ' + this.language);
    });
  }

  ngOnInit() {

    // get the parent info
    this.storage.get(PARENT).then(parentInfo => {
      this.parent = parentInfo;
      this.parentID = this.parent.ParentID;
      console.log('the parentID Loaded in Add Student is: ' + this.parentID);
    });
  }

  goBack() {
    this.router.navigate(['parentdash']);
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

  // show an Action Sheet for choosing or taking image.
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  // get the picture from device camera.
  takePicture() {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.profileImg = 'data:image/jpeg;base64,' + imageData;
      this.fromDevice = true;
      this.studentProfileImageName = this.uploadImage(this.profileImg);
    }, (err) => {
      alert(err);
    });
  }

  // get the picture from device photo library.
  getPicture() {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.profileImg = 'data:image/jpeg;base64,' + imageData;
      this.fromDevice = true;
      this.studentProfileImageName = this.uploadImage(this.profileImg);
    }, (err) => {
      alert(err);
    });
  }

  // the method for uploading QuestionImage.
  uploadImage(image) {

    const fileTransfer: FileTransferObject = this.transfer.create();

    let imageFileName = new Date().getTime() + '.jpg';

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: imageFileName,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpg',
      headers: {}
    }

    fileTransfer.upload(image, this.network.mainUploadStudentProfileImgAPI, options).then((result) => {
      console.log('the Image has been Uploaded');
      this.presentToast('Profile image has been uploaded...');
    }, (err) => {
      alert(err);
    });

    return imageFileName;
  }



  saveChanges(nameFamily, username, password, address, birthdate) {

    if (address == null) { address = ''; }
    if (birthdate == null) { birthdate = '1991-05-08'; }

    if ((nameFamily != null) && (nameFamily != '') && (username != null) && (username != '') && (password != null) && (password != '')) {

      // Check the Duplication of username
      this.network.getStudentByUsername(username).then(studentData => {
        const jsonArray = studentData;
        this.student = jsonArray[0];
        console.log('I Received student: ' + JSON.stringify(this.student));

        // check the Dublication of username
        if (this.student == '0') {
          this.network.addOrEditStudent(1, nameFamily, username, password, address, birthdate, 1, this.studentProfileImageName, 'add', this.parentID).then(result => {
            this.presentToast('Your data has been saved..');
            console.log('the result of saving is: ' + JSON.stringify(result));
          }, (err) => {
            alert(err);
          });
        } else {
          alert('This Username has registered before!');
        }
      }).catch(error => {
        alert(error);
      });

    } else {
      alert('Please fill the required field');
    }
  }

}
