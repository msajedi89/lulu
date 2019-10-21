import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController, AlertController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { async } from '@angular/core/testing';

const baseUrl = 'http://luluwa.me/';
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ALLOWED_MIME_TYPE = 'video/mp4';

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
  selectedVideo: string;
  uploadedVideo: string;
  isUploading = false;
  uploadPercent = 0;
  videoFileUpload: FileTransferObject;
  loader;

  // test
  videoFileName = '';
  errorMsgs = '';
  outputVideo = '';
  outputFileName = '';
  outputFileDir = '';
  outputFileDirSantisized = '';

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService,
    private toastController: ToastController, private actionSheetController: ActionSheetController, private camera: Camera,
    private transfer: FileTransfer, public navCtrl: NavController, private loadingCtrl: LoadingController,
    private media: Media, private file: File, private alertCtrl: AlertController) { }

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


  // **************** Upload Video Part *****************

  showLoader() {
    this.loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

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
    let options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    // 'data:video/mp4;base64,' +
    // 'data:image/jpeg;base64,' +
    this.camera.getPicture(options).then( async (videoUrl) => {

      // this.showLoader();

      this.outputVideo = videoUrl;
      let filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
      this.outputFileName = filename;
      let dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
      this.outputFileDir = dirpath;

      dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
      this.outputFileDirSantisized = dirpath;


      try {
        let dirUrl = await this.file.resolveDirectoryUrl(dirpath);
        let retrievedFile = await this.file.getFile(dirUrl, filename, {});

        retrievedFile.file( data => {
          if (data.size > MAX_FILE_SIZE) return this.errorMsgs = 'You cannot upload more than 5mb.';
          // if (data.type !== ALLOWED_MIME_TYPE) return this.presentToast("Incorrect file type.");

          this.selectedVideo = retrievedFile.nativeURL;
      });
      } catch(err) {
        // this.dismissLoader();
        return this.errorMsgs = 'Something went wrong.';
      }


      this.videoFileName = videoUrl;
    }, (err) => {
      console.log(err);
      this.errorMsgs = err;
    });
  }

}
