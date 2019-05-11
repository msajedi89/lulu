import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const TEACHERID = 'teacherid';

@Component({
  selector: 'app-editteacherprofile',
  templateUrl: './editteacherprofile.page.html',
  styleUrls: ['./editteacherprofile.page.scss'],
})
export class EditteacherprofilePage implements OnInit {

  // student
  teacher: any = '';
  teacherID: any = '';
  profileImg: any = '../../../assets/imgs/default-user.jpg';

  // required variables for Teacher Image name
  teacherImg = '';

  fromDevice = false;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, public navCtrl: NavController,
    public storage: Storage, private toastController: ToastController, private actionSheetController: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer) { }

  ngOnInit() {

    // get the teacher ID then fetch his/her Information
    this.storage.get(TEACHERID).then(teacherIDresult => {
      this.teacherID = teacherIDresult;
      console.log('the teacherID is: ' + this.teacherID);

      this.network.getTeacherByID(this.teacherID).then(teacherData => {
        const jsonArray = teacherData;
        this.teacher = jsonArray[0];
        console.log('the teacher: ' + JSON.stringify(this.teacher));

        // get the teacher Profile Image
        if ((this.teacher.ProfileImg != '') && (this.teacher.ProfileImg != null)) {
          this.profileImg = this.network.mainTeacherProfileImgURL + this.teacher.ProfileImg;
          this.teacherImg = this.teacher.ProfileImg;
        }
      });
    });

  }

  goBack() {
    this.router.navigate(['members', 'teacherdash']);
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

  // **************** Profile Image Part *****************

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

    fileTransfer.upload(image, this.network.mainUploadTeacherProfileImgAPI, options).then((result) => {
      console.log('the Image has been Uploaded');
    }, (err) => {
      alert(err);
    });

    return imageFileName;
  }


  saveChanges(name, Family, username, password, address, email, phone) {

    if (address == null) { address = ''; }
    if (email == null) { email = ''; }
    if (phone == null) { phone = ''; }

    let imageName;

    if (this.fromDevice == true) {
      imageName = this.uploadImage(this.profileImg);
      console.log('the imageName: ' + imageName);
    } else {
      imageName = this.teacherImg;
    }

    if ((name != '') && (Family != '') && (username != '') && (password != '')) {

      
      this.network.EditTeacherProfile(this.teacherID, name, Family, username, password, address, phone, email, imageName).then(result => {
        this.presentToast('Your profile edited successfully..');
        console.log('the result of saving is: ' + JSON.stringify(result));
      }, (err) => {
        alert(err);
      });
    } else {
      alert('Please fill the required field');
    }
  }

}
