import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-uploadlecternvideo',
  templateUrl: './uploadlecternvideo.page.html',
  styleUrls: ['./uploadlecternvideo.page.scss'],
})
export class UploadlecternvideoPage implements OnInit {

  // Category variables
  categories: any;
  category = null;

  goToAssignQuestion = 1;

  // required variables for Video
  videoFile: any;

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService, private toastController: ToastController,
    private actionSheetController: ActionSheetController, private camera: Camera, private transfer: FileTransfer, public navCtrl: NavController,
    private media: Media, private file: File) { }

  ngOnInit() {

    // get all Categories
    this.network.getAllActiveLecternCategory().then(activeCategorisData => {
      this.categories = activeCategorisData;
      console.log('all Active Categories: ' + JSON.stringify(this.categories));
    }).catch(err => {
      alert(err);
    });
  }

  goBack() {
    this.router.navigate(['lecternmainpage']);
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

  onClose($event) {
    console.log('the category selected is: ' + this.category.LecID + ' ' + this.category.Category);
  }


  // **************** Question Image Part *****************

  // show an Action Sheet for choosing or taking image.
  async selectVideo() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Video Source",
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.getPicture();
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


  // get the picture from device photo library.
  getPicture() {
    var options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      mediaType: this.camera.MediaType.VIDEO
    };

    // 'data:image/jpeg;base64,' +
    this.camera.getPicture(options).then((videoData) => {
      this.videoFile = videoData;
      console.log('the videoFile is: ' + this.videoFile);
    }, (err) => {
      alert(err);
    });
  }

}
