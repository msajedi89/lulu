import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { NetworkEngineService } from '../../network-engine.service';

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.page.html',
  styleUrls: ['./uploadvideo.page.scss'],
})
export class UploadvideoPage implements OnInit {

  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;

  errorTxt = '';
  successTxt = '';
  videoData: any;
  nativevideoData: any;

  constructor(private transfer: FileTransfer, private file: File, private filePath: FilePath, private fileChooser: FileChooser,
    private camera: Camera, private network: NetworkEngineService) {

    this.uploadText = '';
    this.downloadText = '';
  }

  ngOnInit() {
  }

  UploadFile() {

    let cameraOptions: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    };

    this.camera.getPicture(cameraOptions).then((uri) => {
      this.videoData = uri;
      this.fileTransfer = this.transfer.create();

        let options: FileUploadOptions = {
          fileKey: 'videofile',
          fileName: 'video.mov',
          chunkedMode: false,
          headers: {}
        }

        this.uploadText = 'uploading...';
        this.fileTransfer.upload(uri, this.network.mainUploadVideoAPI, options).then((data) => {
          this.successTxt = 'transfer done.' + JSON.stringify(data);
          this.uploadText = '';
        }, (err) => {
          this.uploadText = '';
          this.errorTxt = JSON.stringify(err) + ' ' + 'fileTransfer';
        })
    }, (err) => {
      this.errorTxt = JSON.stringify(err) + ' ' + 'camera';
    })
  }

  AbortUpload() {
    this.fileTransfer.abort();
    this.successTxt = 'Upload cancelled!';
  }

}
