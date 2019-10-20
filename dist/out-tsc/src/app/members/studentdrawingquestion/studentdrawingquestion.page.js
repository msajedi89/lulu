import * as tslib_1 from "tslib";
import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var StudentdrawingquestionPage = /** @class */ (function () {
    function StudentdrawingquestionPage(router, platform, renderer, network, navCtrl, storage, transfer, camera, popoverCtrl) {
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
    StudentdrawingquestionPage.prototype.presentPopover = function (ev) {
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
    StudentdrawingquestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(ROOT).then(function (whereResult) {
            _this.fromWhere = whereResult;
            console.log('from Where: ' + _this.fromWhere);
            if (_this.fromWhere == 'exam') {
                // get the Student Exam ID
                _this.storage.get(STUDENTEXAMID).then(function (resultstExamID) {
                    _this.stExamID = resultstExamID;
                    console.log('the stExamID is: ' + _this.stExamID);
                });
            }
            else if (_this.fromWhere == 'homework') {
                // get the Student Homework ID
                _this.storage.get(STUDENTHOMEWORKID).then(function (resultstExamID) {
                    _this.stExamID = resultstExamID;
                    console.log('the stHomeworkID is: ' + _this.stExamID);
                });
            }
        });
        // get the Student ID
        this.storage.get(USERID).then(function (resultUserID) {
            _this.stID = resultUserID;
            console.log('the stID is: ' + _this.stID);
        });
        // get the Question ID
        this.storage.get(QUESTIONID).then(function (resultQID) {
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
    // play the Question Voice
    StudentdrawingquestionPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    StudentdrawingquestionPage.prototype.goBack = function () {
        if (this.fromWhere == 'exam') {
            this.router.navigate(['members', 'studentexamquestionslist']);
        }
        else if (this.fromWhere == 'homework') {
            this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
    };
    StudentdrawingquestionPage.prototype.ngAfterViewInit = function () {
    };
    StudentdrawingquestionPage.prototype.changeColour = function (colour) {
        this.currentColour = colour;
    };
    StudentdrawingquestionPage.prototype.eraser = function (colour) {
        this.currentColour = colour;
    };
    StudentdrawingquestionPage.prototype.changeSize = function (size) {
        this.brushSize = size;
    };
    StudentdrawingquestionPage.prototype.handleStart = function (ev) {
        var canvasPosition = this.canvasElement.getBoundingClientRect();
        this.lastX = ev.touches[0].pageX - canvasPosition.x;
        this.lastY = ev.touches[0].pageY - canvasPosition.y;
    };
    StudentdrawingquestionPage.prototype.handleMove = function (ev) {
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
    StudentdrawingquestionPage.prototype.handleEnd = function (ev) {
        console.log(ev);
    };
    StudentdrawingquestionPage.prototype.clearCanvas = function () {
        var ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    // get the picture from device camera.
    StudentdrawingquestionPage.prototype.takePicture = function () {
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
    StudentdrawingquestionPage.prototype.getPicture = function () {
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
    // *************** Record the Student's Answer **************
    StudentdrawingquestionPage.prototype.goNext = function () {
        var _this = this;
        var imageName;
        if (this.fromDevice == true) {
            imageName = this.uploadImage(this.image);
            console.log('the imageName: ' + imageName);
        }
        else {
            this.image = this.canvasElement.toDataURL();
            imageName = this.uploadImage(this.image);
            console.log('the imageName: ' + imageName);
        }
        // record the result
        this.network.recordStudentDrawingAnswer(this.stExamID, this.stID, this.QID, imageName, this.fromWhere).then(function (result) {
            console.log('I received: ' + JSON.stringify(result));
            if (_this.fromWhere == 'exam') {
                _this.router.navigate(['members', 'studentexamquestionslist']);
            }
            else if (_this.fromWhere == 'homework') {
                _this.router.navigate(['members', 'studenthomeworkquestionslist']);
            }
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading QuestionImage.
    StudentdrawingquestionPage.prototype.uploadImage = function (image) {
        var fileTransfer = this.transfer.create();
        var imageFileName = new Date().getTime() + '.jpg';
        var options = {
            fileKey: 'photo',
            fileName: imageFileName,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpg",
            headers: {}
        };
        fileTransfer.upload(image, this.network.mainUploadStudentsDrawingAPI, options).then(function (result) {
            console.log("the Image has been Uploaded");
        }, function (err) {
            alert(err);
        });
        return imageFileName;
    };
    // Make image from DataURL
    StudentdrawingquestionPage.prototype.b64toBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    tslib_1.__decorate([
        ViewChild('myCanvas'),
        tslib_1.__metadata("design:type", Object)
    ], StudentdrawingquestionPage.prototype, "canvas", void 0);
    StudentdrawingquestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentdrawingquestion',
            templateUrl: './studentdrawingquestion.page.html',
            styleUrls: ['./studentdrawingquestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, Renderer, NetworkEngineService,
            NavController, Storage, FileTransfer, Camera,
            PopoverController])
    ], StudentdrawingquestionPage);
    return StudentdrawingquestionPage;
}());
export { StudentdrawingquestionPage };
//# sourceMappingURL=studentdrawingquestion.page.js.map