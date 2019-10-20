import * as tslib_1 from "tslib";
import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';
var LECTERNQUESTIONID = 'lecternqid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var LecterndrawingquestionPage = /** @class */ (function () {
    function LecterndrawingquestionPage(router, platform, renderer, network, navCtrl, storage, transfer, camera, popoverCtrl) {
        this.router = router;
        this.platform = platform;
        this.renderer = renderer;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.transfer = transfer;
        this.camera = camera;
        this.popoverCtrl = popoverCtrl;
        this.currentColour = '#1abc9c';
        this.brushSize = 5;
        this.question = '';
        this.questionImage = '';
        this.fromDevice = false;
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
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
    LecterndrawingquestionPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Question ID
        this.storage.get(LECTERNQUESTIONID).then(function (resultQID) {
            _this.QID = resultQID;
            console.log('the QID: ' + JSON.stringify(_this.QID));
            // get the question
            _this.network.getQuestionByID(_this.QID).then(function (data) {
                var jsonArray = data;
                _this.question = jsonArray[0];
                console.log('the question: ' + JSON.stringify(_this.question));
                // get the Question Image
                _this.questionImage = _this.network.mainUploadImgUrl + _this.question.Image;
                // get the question Voice
                _this.questionVoice = new Audio();
                _this.questionVoice.src = _this.network.mainQuestionVoicesUrl + _this.question.VoiceEn;
                _this.questionVoice.load();
                // get the descriptions for pop up
                _this.descriptionEn = _this.question.Description;
                _this.descriptionAr = _this.question.DescriptionAr;
            });
        });
        this.canvasElement = this.canvas.nativeElement;
        // this.platform.height() + ''
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', 200 + '');
    };
    LecterndrawingquestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternquestionspage']);
    };
    // play the Question Voice
    LecterndrawingquestionPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    LecterndrawingquestionPage.prototype.ngAfterViewInit = function () {
    };
    LecterndrawingquestionPage.prototype.changeColour = function (colour) {
        this.currentColour = colour;
    };
    LecterndrawingquestionPage.prototype.eraser = function (colour) {
        this.currentColour = colour;
    };
    LecterndrawingquestionPage.prototype.changeSize = function (size) {
        this.brushSize = size;
    };
    LecterndrawingquestionPage.prototype.handleStart = function (ev) {
        var canvasPosition = this.canvasElement.getBoundingClientRect();
        this.lastX = ev.touches[0].pageX - canvasPosition.x;
        this.lastY = ev.touches[0].pageY - canvasPosition.y;
    };
    LecterndrawingquestionPage.prototype.handleMove = function (ev) {
        var canvasPosition = this.canvasElement.getBoundingClientRect();
        var currentX = ev.touches[0].pageX - canvasPosition.x;
        var currentY = ev.touches[0].pageY - canvasPosition.y;
        var ctx = this.canvasElement.getContext('2d');
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
    };
    LecterndrawingquestionPage.prototype.handleEnd = function (ev) {
        console.log(ev);
    };
    LecterndrawingquestionPage.prototype.clearCanvas = function () {
        var ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    LecterndrawingquestionPage.prototype.presentPopover = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: PopoverComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        this.storage.set(DESCRIPTIONENGLISH, this.descriptionEn);
                        this.storage.set(DESCRIPTIONARABIC, this.descriptionAr);
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // get the picture from device camera.
    LecterndrawingquestionPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            _this.fromDevice = true;
        }, function (err) {
            alert(err);
        });
    };
    // get the picture from device photo library.
    LecterndrawingquestionPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = 'data:image/jpeg;base64,' + imageData;
            _this.fromDevice = true;
        }, function (err) {
            alert(err);
        });
    };
    tslib_1.__decorate([
        ViewChild('myCanvas'),
        tslib_1.__metadata("design:type", Object)
    ], LecterndrawingquestionPage.prototype, "canvas", void 0);
    LecterndrawingquestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-lecterndrawingquestion',
            templateUrl: './lecterndrawingquestion.page.html',
            styleUrls: ['./lecterndrawingquestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, Renderer, NetworkEngineService,
            NavController, Storage, FileTransfer, Camera,
            PopoverController])
    ], LecterndrawingquestionPage);
    return LecterndrawingquestionPage;
}());
export { LecterndrawingquestionPage };
//# sourceMappingURL=lecterndrawingquestion.page.js.map