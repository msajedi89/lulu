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
var DragdroptypequestionPage = /** @class */ (function () {
    function DragdroptypequestionPage(router, platform, network, toastController, actionSheetController, camera, transfer, navCtrl, media, file) {
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
        this.myQuestionImgID = 1;
        // required variables for Question's Audio
        this.recording = false;
    }
    DragdroptypequestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get Main Titles
            _this.network.getMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        });
    };
    DragdroptypequestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'questions']);
    };
    // ***************** Main Title Select *****************
    DragdroptypequestionPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    DragdroptypequestionPage.prototype.onClose = function () {
        var _this = this;
        // get the Sub Title of Chosen Main Title
        this.network.getSubTitles(this.mainTitle.mtID).then(function (data) {
            console.log('I recieved Sub Title: ' + JSON.stringify(data));
            _this.subTitles = data;
        });
    };
    // show a Toast.
    DragdroptypequestionPage.prototype.presentToast = function (text) {
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
    DragdroptypequestionPage.prototype.selectImage = function (root, imageName) {
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
    DragdroptypequestionPage.prototype.takePicture = function (root, imageName) {
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
                else if (root == "fstChoice") {
                    _this.fstChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.fstChoiceImage, imageName, root);
                }
                else if (root == "secChoice") {
                    _this.secChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.secChoiceImage, imageName, root);
                }
                else if (root == "trdChoice") {
                    _this.trdChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.trdChoiceImage, imageName, root);
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
    DragdroptypequestionPage.prototype.getPicture = function (root, imageName) {
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
                else if (root == "fstChoice") {
                    _this.fstChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.fstChoiceImage, imageName, root);
                }
                else if (root == "secChoice") {
                    _this.secChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.secChoiceImage, imageName, root);
                }
                else if (root == "trdChoice") {
                    _this.trdChoiceImage = 'data:image/jpeg;base64,' + imageData;
                    // Insert & Upload Image
                    _this.insertImage(_this.trdChoiceImage, imageName, root);
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
    DragdroptypequestionPage.prototype.insertImage = function (realImage, imgName, root) {
        var _this = this;
        var imageFileName = this.uploadImage(realImage);
        //let imageID;
        this.network.insertImage(imageFileName, imgName).then(function (data) {
            if (root == "question") {
                _this.myQuestionImgID = _this.showData(data);
            }
            else if (root == "fstChoice") {
                _this.myFstImgID = _this.showData(data);
            }
            else if (root == "secChoice") {
                _this.mySecImgID = _this.showData(data);
            }
            else if (root == "trdChoice") {
                _this.myTrdImgID = _this.showData(data);
            }
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading QuestionImage.
    DragdroptypequestionPage.prototype.uploadImage = function (image) {
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
    DragdroptypequestionPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    DragdroptypequestionPage.prototype.startAudio = function (root, voiceNameEn, voiceNameAr) {
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
    DragdroptypequestionPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";
        return newFileName;
    };
    //the method for stopping the recorder
    DragdroptypequestionPage.prototype.stopAudio = function (root, voiceNameEn, voiceNameAr) {
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
    DragdroptypequestionPage.prototype.playAudio = function (file, root) {
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
    DragdroptypequestionPage.prototype.insertVoice = function (audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {
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
    DragdroptypequestionPage.prototype.uploadAudio = function (audioFileName, audioFilePath) {
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
    DragdroptypequestionPage.prototype.showData = function (data) {
        var jsonArray = data;
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var obj = jsonArray_1[_i];
            for (var key in obj) {
                this.returnValue = obj[key];
            }
        }
        return this.returnValue;
    };
    DragdroptypequestionPage.prototype.insertQuestion = function (name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {
        var _this = this;
        if (questionAr == null) {
            questionAr = '';
        }
        if (questionAz == null) {
            questionAz = '';
        }
        if (maxTime == null) {
            maxTime = 0;
        }
        if (descriptionEn == null) {
            descriptionEn = '';
        }
        if (descriptionAr == null) {
            descriptionAr = '';
        }
        if (this.myQuestionVoiceID == null) {
            this.myQuestionVoiceID = 1;
        }
        // ****** insert Question ******
        if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {
            this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz, this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 1).then(function (data) {
                _this.myQuestionID = _this.showData(data);
                console.log('The inserted Question ID is: ' + _this.myQuestionID);
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the Required fields');
        }
    };
    // Insert Question Answer
    DragdroptypequestionPage.prototype.insertQuestionAnswer = function (fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr, secChoiceAz, trdChoiceEn, trdChoiceAr, trdChoiceAz) {
        var _this = this;
        if (fstChoiceAz == null) {
            fstChoiceAz = "";
        }
        if (fstChoiceAr == null) {
            fstChoiceAr = "";
        }
        if (secChoiceAz == null) {
            secChoiceAz = "";
        }
        if (secChoiceAr == null) {
            secChoiceAr = "";
        }
        if (trdChoiceAz == null) {
            trdChoiceAz = "";
        }
        if (trdChoiceAr == null) {
            trdChoiceAr = "";
        }
        if (this.myFstImgID == null) {
            this.myFstImgID = 1;
        }
        if (this.mySecImgID == null) {
            this.mySecImgID = 1;
        }
        if (this.myTrdImgID == null) {
            this.myTrdImgID = 1;
        }
        if ((fstChoiceEn != null) && (secChoiceEn != null) && (trdChoiceEn != null)) {
            // insert Question Answer to tbl_SelectionAnswersType
            var myAnswerID_1;
            this.network.insertDragDropAnswersType(this.myQuestionID, fstChoiceEn, fstChoiceAr, fstChoiceAz, secChoiceEn, secChoiceAr, secChoiceAz, trdChoiceEn, trdChoiceAr, trdChoiceAz, this.myFstImgID, this.mySecImgID, this.myTrdImgID).then(function (data) {
                myAnswerID_1 = _this.showData(data);
                _this.presentToast('The Question has been inserted. with the QuestionID: ' + _this.myQuestionID + ' and AnswerID: ' + myAnswerID_1);
                console.log('The insertedDragDropAnswer ID is: ' + myAnswerID_1);
            }, function (err) {
                alert(err);
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], DragdroptypequestionPage.prototype, "selectComponent", void 0);
    DragdroptypequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-dragdroptypequestion',
            templateUrl: './dragdroptypequestion.page.html',
            styleUrls: ['./dragdroptypequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, Camera, FileTransfer, NavController,
            Media, File])
    ], DragdroptypequestionPage);
    return DragdroptypequestionPage;
}());
export { DragdroptypequestionPage };
//# sourceMappingURL=dragdroptypequestion.page.js.map