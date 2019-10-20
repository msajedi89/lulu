import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
var DrawletterquestionPage = /** @class */ (function () {
    function DrawletterquestionPage(router, platform, network, toastController, actionSheetController, camera, transfer, navCtrl, media, file) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.transfer = transfer;
        this.navCtrl = navCtrl;
        this.media = media;
        this.file = file;
        this.mainTitle = null;
        this.subTitle = null;
        // required variables for Question's Audio
        this.recording = false;
    }
    DrawletterquestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get Main Titles
            _this.network.getMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        });
    };
    DrawletterquestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'questions']);
    };
    // ***************** Main Title Select *****************
    DrawletterquestionPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    DrawletterquestionPage.prototype.onClose = function () {
        var _this = this;
        // get the Sub Title of Chosen Main Title
        this.network.getSubTitles(this.mainTitle.mtID).then(function (data) {
            console.log('I recieved Sub Title: ' + JSON.stringify(data));
            _this.subTitles = data;
        });
    };
    // show a Toast.
    DrawletterquestionPage.prototype.presentToast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
                            position: 'bottom',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // **************** Question Image Part *****************
    // show an Action Sheet for choosing or taking image.
    DrawletterquestionPage.prototype.selectImage = function (root, imageName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Select Image Source",
                            buttons: [
                                {
                                    text: 'Load from Library',
                                    handler: function () {
                                        _this.getPicture(root, imageName);
                                    }
                                },
                                {
                                    text: 'Use Camera',
                                    handler: function () {
                                        _this.takePicture(root, imageName);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // get the picture from device camera.
    DrawletterquestionPage.prototype.takePicture = function (root, imageName) {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        if (imageName != null) {
            this.camera.getPicture(options).then(function (imageData) {
                if (root == "question") {
                    _this.questionImg = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.questionImg, imageName, root);
                }
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Please fill the related name for this image");
        }
    };
    // get the picture from device photo library.
    DrawletterquestionPage.prototype.getPicture = function (root, imageName) {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        if (imageName != null) {
            this.camera.getPicture(options).then(function (imageData) {
                if (root == "question") {
                    _this.questionImg = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.questionImg, imageName, root);
                }
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Please fill the related name for this image");
        }
    };
    // the method for inserting Image.
    DrawletterquestionPage.prototype.insertImage = function (realImage, imgName, root) {
        var _this = this;
        var imageFileName = this.uploadImage(realImage);
        //let imageID;
        this.network.insertImage(imageFileName, imgName).then(function (data) {
            if (root == "question") {
                _this.myQuestionImgID = _this.showData(data);
            }
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading QuestionImage.
    DrawletterquestionPage.prototype.uploadImage = function (image) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var imageFileName = this.createFileName();
        var options = {
            fileKey: 'photo',
            fileName: imageFileName,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpeg",
            headers: {}
        };
        fileTransfer.upload(image, this.network.mainUploadImgAPI, options).then(function (data) {
            _this.presentToast("the Image has been Uploaded");
        }, function (err) {
            alert(err);
        });
        return imageFileName;
    };
    // Generate the image name by Datetime of system
    DrawletterquestionPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    DrawletterquestionPage.prototype.startAudio = function (root, voiceNameEn, voiceNameAr) {
        if ((voiceNameEn != null) && (voiceNameAr != null)) {
            if (root == "question") {
                if (this.platform.is('ios')) {
                    this.questionAudiofileName = this.generateAudioFileName();
                    this.questionAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.questionAudiofileName;
                    this.questionAudio = this.media.create(this.questionAudioFilePath);
                }
                else if (this.platform.is('android')) {
                    this.questionAudiofileName = this.generateAudioFileName();
                    this.questionAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.questionAudiofileName;
                    this.questionAudio = this.media.create(this.questionAudioFilePath);
                }
                this.questionAudio.startRecord();
                this.recording = true;
            }
        }
        else {
            alert("Please fill the related name for inserting this voice!");
        }
    };
    // Generate the name by Datetime of system
    DrawletterquestionPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";
        return newFileName;
    };
    //the method for stopping the recorder
    DrawletterquestionPage.prototype.stopAudio = function (root, voiceNameEn, voiceNameAr) {
        if ((voiceNameEn != null) && (voiceNameAr != null)) {
            if (root == "question") {
                this.questionAudio.stopRecord();
                this.myQuestionAudio = 'data:audio/m4a;base64, ' + this.questionAudio;
                this.recording = false;
                // Insert & Upload Question Voice
                this.insertVoice(this.questionAudiofileName, this.questionAudioFilePath, voiceNameEn, voiceNameAr, root);
            }
        }
    };
    // the method for playing recorded Audio
    DrawletterquestionPage.prototype.playAudio = function (file, root) {
        if (root == "question") {
            if (this.platform.is('ios')) {
                this.questionAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.questionAudio = this.media.create(this.questionAudioFilePath);
            }
            else if (this.platform.is('android')) {
                this.questionAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.questionAudio = this.media.create(this.questionAudioFilePath);
            }
            this.questionAudio.play();
            this.questionAudio.setVolume(0.8);
        }
    };
    // the method for inserting Voice
    DrawletterquestionPage.prototype.insertVoice = function (audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {
        var _this = this;
        // Upload Voice
        this.uploadAudio(audioFileName, audioFilePath);
        this.network.insertVoice(audioFileName, audioNameEn, audioNameAr).then(function (data) {
            if (root == "question") {
                _this.myQuestionVoiceID = _this.showData(data);
            }
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading voice recordings
    DrawletterquestionPage.prototype.uploadAudio = function (audioFileName, audioFilePath) {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'audio',
            fileName: audioFileName,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'audio/mp3',
            headers: {}
        };
        fileTransfer.upload(audioFilePath, this.network.mainUploadVoiceAPI, options).then(function (data) {
            _this.presentToast("The Audio has been uploaded.");
        }, function (err) {
            console.log(err);
            alert(err);
        });
    };
    // **************** the Inserting Question Section ******************
    DrawletterquestionPage.prototype.insertQuestion = function (name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {
        var _this = this;
        if (questionAr == null) {
            questionAr = "";
        }
        if (questionAz == null) {
            questionAz = "";
        }
        if (maxTime == null) {
            maxTime = 0;
        }
        if (descriptionEn == null) {
            descriptionEn = "";
        }
        if (descriptionAr == null) {
            descriptionAr = "";
        }
        if (this.myQuestionVoiceID == null) {
            this.myQuestionVoiceID = 1;
        }
        if (this.myQuestionImgID == null) {
            this.myQuestionImgID = 1;
        }
        // ****** insert Question ******
        if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {
            var myQuestionID_1;
            this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz, this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 5).then(function (data) {
                myQuestionID_1 = _this.showData(data);
                console.log("The inserted Question ID is: " + myQuestionID_1);
                _this.presentToast("A new Question with ID: " + myQuestionID_1 + " has been inserted.");
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Please fill the Required fields");
        }
    };
    DrawletterquestionPage.prototype.showData = function (data) {
        var jsonArray = data;
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var obj = jsonArray_1[_i];
            for (var key in obj) {
                this.returnValue = obj[key];
            }
        }
        return this.returnValue;
    };
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], DrawletterquestionPage.prototype, "selectComponent", void 0);
    DrawletterquestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-drawletterquestion',
            templateUrl: './drawletterquestion.page.html',
            styleUrls: ['./drawletterquestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, Camera, FileTransfer, NavController,
            Media, File])
    ], DrawletterquestionPage);
    return DrawletterquestionPage;
}());
export { DrawletterquestionPage };
//# sourceMappingURL=drawletterquestion.page.js.map