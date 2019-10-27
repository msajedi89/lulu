import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';

const QUESTIONID = 'questionid';
const USERID = 'userid';
const STUDENTEXAMID = 'examid';
const ROOT = 'questionroot';
const STUDENTHOMEWORKID = 'homeworkid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-studentdrawingquestion',
  templateUrl: './studentdrawingquestion.page.html',
  styleUrls: ['./studentdrawingquestion.page.scss'],
})
export class StudentdrawingquestionPage implements OnInit {

  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour: string = '#1abc9c';
  availableColours: any;

  brushSize: number = 5;

  QID: any;
  stID: any;
  stExamID: any;

  question: any = '';
  questionImage: any = '';
  questionVoice: any;
  image: any;

  fromDevice = false;

  // the variable for Rooting
  fromWhere: any;

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

  // max time variables
  maxTime: any;
  c = 0;
  t: any;
  timer_is_on = 0;

  constructor(private router: Router, public platform: Platform, public renderer: Renderer, private network: NetworkEngineService,
    public navCtrl: NavController, public storage: Storage, private transfer: FileTransfer, private camera: Camera,
    public popoverCtrl: PopoverController) {
    console.log('Hello CanvasDraw Component');

    this.availableColours = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c',
      '#626262',
      '#000000'
    ];

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    this.storage.set(DESCRIPTIONENGLISH, this.descriptionEn);
    this.storage.set(DESCRIPTIONARABIC, this.descriptionAr);

    return await popover.present();
  }

  ngOnInit() {

    this.storage.get(ROOT).then(whereResult => {
      this.fromWhere = whereResult;
      console.log('from Where: ' + this.fromWhere);

      if (this.fromWhere == 'exam') {
        // get the Student Exam ID
        this.storage.get(STUDENTEXAMID).then(resultstExamID => {
          this.stExamID = resultstExamID;
          console.log('the stExamID is: ' + this.stExamID);
        });
      } else if (this.fromWhere == 'homework') {
        // get the Student Homework ID
        this.storage.get(STUDENTHOMEWORKID).then(resultstExamID => {
          this.stExamID = resultstExamID;
          console.log('the stHomeworkID is: ' + this.stExamID);
        });
      }
    });

    // get the Student ID
    this.storage.get(USERID).then(resultUserID => {
      this.stID = resultUserID;
      console.log('the stID is: ' + this.stID);
    });

    // get the Question ID
    this.storage.get(QUESTIONID).then(resultQID => {
      this.QID = resultQID;
      console.log('the QID: ' + JSON.stringify(this.QID));

      // get the question
      this.network.getQuestionByID(this.QID).then(data => {
        const jsonArray = data;
        this.question = jsonArray[0];
        console.log('the question: ' + JSON.stringify(this.question));

        // get the Question Image
        this.questionImage = this.network.mainUploadImgUrl + this.question.Image;

        // get the question Voice
        this.questionVoice = new Audio();
        this.questionVoice.src = this.network.mainQuestionVoicesUrl + this.question.VoiceEn;
        this.questionVoice.load();

        // get the descriptions for pop up
        this.descriptionEn = this.question.Description;
        this.descriptionAr = this.question.DescriptionAr;

        // get the Max time
        this.maxTime = this.question.MaxTime;
        this.c = parseInt(this.maxTime);
        console.log('the maxTime is: ' + this.maxTime);
        console.log('the c is: ' + this.c);
        this.timedCount();
      });
    });

    this.canvasElement = this.canvas.nativeElement;
    // this.platform.height() + ''
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 200 + '');
  }

  // Timer
  timedCount() {
    if (this.c > 0) {
      let hideFooterTimeout = setTimeout(() => {
        this.c = this.c - 1;
        this.timedCount();
      }, 1000);
    } else {
      this.goBack();
    }
  }

  // play the Question Voice
  playVoice() {
    this.questionVoice.play();
  }

  goBack() {
    if (this.fromWhere == 'exam') {
      this.router.navigate(['members', 'studentexamquestionslist']);
    } else if (this.fromWhere == 'homework') {
      this.router.navigate(['members', 'studenthomeworkquestionslist']);
    }
  }

  ngAfterViewInit() {
  }

  changeColour(colour) {
    this.currentColour = colour;
  }

  eraser(colour) {
    this.currentColour = colour;
  }

  changeSize(size) {
    this.brushSize = size;
  }

  handleStart(ev) {
    let canvasPosition = this.canvasElement.getBoundingClientRect();

    this.lastX = ev.touches[0].pageX - canvasPosition.x;
    this.lastY = ev.touches[0].pageY - canvasPosition.y;
  }

  handleMove(ev) {
    let canvasPosition = this.canvasElement.getBoundingClientRect();


    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;

    let ctx = this.canvasElement.getContext('2d');
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

  }

  handleEnd(ev) {

    console.log(ev);
  }

  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
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
      this.image = 'data:image/jpeg;base64,' + imageData;
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
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.fromDevice = true;
    }, (err) => {
      alert(err);
    });
  }

  // *************** Record the Student's Answer **************

  goNext() {

    let imageName;

    if (this.fromDevice == true) {
      imageName = this.uploadImage(this.image);
      console.log('the imageName: ' + imageName);
    } else {
      this.image = this.canvasElement.toDataURL();

      imageName = this.uploadImage(this.image);
      console.log('the imageName: ' + imageName);
    }

    // record the result
    this.network.recordStudentDrawingAnswer(this.stExamID, this.stID, this.QID, imageName, this.fromWhere).then(result => {
      console.log('I received: ' + JSON.stringify(result));
      if (this.fromWhere == 'exam') {
        this.router.navigate(['members', 'studentexamquestionslist']);
      } else if (this.fromWhere == 'homework') {
        this.router.navigate(['members', 'studenthomeworkquestionslist']);
      }
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
      mimeType: "image/jpg",
      headers: {}
    }

    fileTransfer.upload(image, this.network.mainUploadStudentsDrawingAPI, options).then((result) => {
      console.log("the Image has been Uploaded");
    }, (err) => {
      alert(err);
    });

    return imageFileName;
  }

  // Make image from DataURL
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';

    let sliceSize = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }

}
