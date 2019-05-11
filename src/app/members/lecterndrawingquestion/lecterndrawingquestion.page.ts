import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';

const LECTERNQUESTIONID = 'lecternqid';

// for pop up
const DESCRIPTIONENGLISH = 'descriptionEnglish';
const DESCRIPTIONARABIC = 'descriptionArabic';

@Component({
  selector: 'app-lecterndrawingquestion',
  templateUrl: './lecterndrawingquestion.page.html',
  styleUrls: ['./lecterndrawingquestion.page.scss'],
})
export class LecterndrawingquestionPage implements OnInit {

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

  // the Description variables for pop up
  descriptionEn: any = '';
  descriptionAr: any = '';

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

  ngOnInit() {

    // get the Question ID
    this.storage.get(LECTERNQUESTIONID).then(resultQID => {
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
      });
    });

    this.canvasElement = this.canvas.nativeElement;
    // this.platform.height() + ''
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', 200 + '');
  }

  goBack() {
    this.router.navigate(['members', 'lecternquestionspage']);
  }

  // play the Question Voice
  playVoice() {
    this.questionVoice.play();
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

}
