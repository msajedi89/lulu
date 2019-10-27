import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController, AlertController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

// for next page
const LECTERNVIDEOIDFORADD = 'lecternvideoidforadd';
const FROMWHEREINLECTERNVIDEOS = 'fromwhere';

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
  videoFileName = '';
  uploadText: any;
  fileTransfer: FileTransferObject;
  isUploading = false;

  // the child for viewing select component.
  @ViewChild('myselect') selectComponent: IonicSelectableComponent;

  constructor(private router: Router, public platform: Platform, private network: NetworkEngineService,
    private toastController: ToastController, private actionSheetController: ActionSheetController, private camera: Camera,
    private transfer: FileTransfer, public navCtrl: NavController, private loadingCtrl: LoadingController,
    private media: Media, private file: File, private alertCtrl: AlertController, public storage: Storage) { }

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

  // show an Action Sheet for choosing or taking image.
  async selectVideo() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Video Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.UploadFile();
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


  UploadFile() {

    let cameraOptions: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    };

    this.camera.getPicture(cameraOptions).then((uri) => {
      this.fileTransfer = this.transfer.create();

      this.videoFileName = this.createFileName();

      let options: FileUploadOptions = {
        fileKey: 'videofile',
        fileName: this.videoFileName,
        chunkedMode: false,
        headers: {}
      }

      this.uploadText = 'uploading...';
      this.isUploading = true;

      this.fileTransfer.upload(uri, this.network.mainUploadVideoAPI, options).then((data) => {
        this.uploadText = '';
        this.isUploading = false;
        this.presentToast('The file was successfully Uploaded..');
      }, (err) => {
        this.uploadText = '';
        this.isUploading = false;
        this.videoFileName = '';
        alert(JSON.stringify(err) + ' ' + 'fileTransfer');
      });
    }, (err) => {
      this.videoFileName = '';
      alert(JSON.stringify(err) + ' ' + 'camera');
    });
  }

  AbortUpload() {
    this.fileTransfer.abort();
    this.presentToast('Upload cancelled!');
    this.uploadText = '';
    this.isUploading = false;
    this.videoFileName = '';
  }

  // Generate the video name by Datetime of system
  createFileName() {
    let d = new Date(), n = d.getTime(), newFileName = n + '.mp4';

    return newFileName;
  }


  // ************  Insert a record for this Video ************
  saveChanges(videoName, description) {
    if (description == null) { description = ''; }

    if ((videoName != '') && (videoName != null)) {
      if (this.category != null) {
        if (this.videoFileName != '') {
          this.network.insertLecternVideo(videoName, this.category.LecID, this.videoFileName, description).then(insertingResult => {
            console.log('the result of saving is: ' + JSON.stringify(insertingResult));
            this.presentToast('Video saved successfully...');

            // get the new inserted videoID and pass it to next page to assign questions
            if (this.goToAssignQuestion == 1) {
              const jsonArray1 = insertingResult;
              let newInsertedVideo = jsonArray1[0];
              console.log('the new inserted video info: ' + JSON.stringify(newInsertedVideo));
              let newVideoID = newInsertedVideo.VideoID;

              this.storage.set(LECTERNVIDEOIDFORADD, newVideoID).then(() => {
                this.storage.set(FROMWHEREINLECTERNVIDEOS, 'uploadlecternvideo').then(() => {
                  this.router.navigate(['addvideoquestions']);
                });
              });
            }
          }).catch(err => {
            alert(err);
          })
        } else {
          alert('Please select a Video!');
        }
      } else {
        alert('Please choose a category!');
      }
    } else {
      alert('Please fill the Video Name!');
    }
  }

}
