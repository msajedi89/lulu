import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Media } from '@ionic-native/media/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';
var STORAGE_KEY = 'my_images';
var SelectiontypequestionsPage = /** @class */ (function () {
    function SelectiontypequestionsPage(router, camera, file, http, webView, storage, plt, loadingController, ref, actionSheetController, toastController, transfer, navCtrl, media, platform, network) {
        this.router = router;
        this.camera = camera;
        this.file = file;
        this.http = http;
        this.webView = webView;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.transfer = transfer;
        this.navCtrl = navCtrl;
        this.media = media;
        this.platform = platform;
        this.network = network;
        // required variables for Question's Audio
        this.recording = false;
        this.mainTitle = null;
        this.subTitle = null;
        this.fstChoice = null;
        this.secChoice = null;
        this.trdChoice = null;
        this.fstRecording = false;
        this.secRecording = false;
        this.trdRecording = false;
        this.testVoiceID = null;
        // Multi Selection variable
        this.multi = true;
        // *********** Correct Choices Section ***************
        // the choices for choosing the correct Choice.
        this.correctChoice = null;
        this.correctChoices = [
            {
                id: 1,
                choices: '1'
            },
            {
                id: 2,
                choices: '2'
            },
            {
                id: 3,
                choices: '3'
            },
            {
                id: 4,
                choices: '1,2'
            },
            {
                id: 5,
                choices: '1,3'
            },
            {
                id: 6,
                choices: '2,3'
            },
            {
                id: 7,
                choices: '1,2,3'
            }
        ];
    }
    SelectiontypequestionsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get Main Titles
            _this.network.getMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
                // get Selection Choices
                _this.network.getSelectionChoices().then(function (data) {
                    console.log('I recieved Selection Choices: ' + JSON.stringify(data));
                    _this.selectionChoices = data;
                });
            });
        });
    };
    SelectiontypequestionsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'questions']);
    };
    // ***************** Main Title Select *****************
    SelectiontypequestionsPage.prototype.getMainTitleID = function () {
        console.log('Chosen Main Title: ' + this.mainTitle.mtID);
    };
    SelectiontypequestionsPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    SelectiontypequestionsPage.prototype.onClose = function () {
        var _this = this;
        // get the Sub Title of Chosen Main Title
        this.network.getSubTitles(this.mainTitle.mtID).then(function (data) {
            console.log('I recieved Sub Title: ' + JSON.stringify(data));
            _this.subTitles = data;
        });
    };
    // the method for opening the viewchild.
    SelectiontypequestionsPage.prototype.openFromCode = function () {
        this.selectComponent.open();
    };
    // show a Toast.
    SelectiontypequestionsPage.prototype.presentToast = function (text) {
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
    SelectiontypequestionsPage.prototype.selectImage = function (root, imageName) {
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
    SelectiontypequestionsPage.prototype.takePicture = function (root, imageName) {
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
    SelectiontypequestionsPage.prototype.getPicture = function (root, imageName) {
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
    SelectiontypequestionsPage.prototype.insertImage = function (realImage, imgName, root) {
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
    SelectiontypequestionsPage.prototype.uploadImage = function (image) {
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
    SelectiontypequestionsPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    SelectiontypequestionsPage.prototype.startAudio = function (root, voiceNameEn, voiceNameAr) {
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
            else if (root == "fstChoice") {
                if (this.platform.is('ios')) {
                    this.fstAudioFileName = this.generateAudioFileName();
                    this.fstAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fstAudioFileName;
                    this.fstAudio = this.media.create(this.fstAudioFilePath);
                }
                else if (this.platform.is('android')) {
                    this.fstAudioFileName = this.generateAudioFileName();
                    this.fstAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fstAudioFileName;
                    this.fstAudio = this.media.create(this.fstAudioFilePath);
                }
                this.fstAudio.startRecord();
                this.fstRecording = true;
            }
            else if (root == "secChoice") {
                if (this.platform.is('ios')) {
                    this.secAudioFileName = this.generateAudioFileName();
                    this.secAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.secAudioFileName;
                    this.secAudio = this.media.create(this.secAudioFilePath);
                }
                else if (this.platform.is('android')) {
                    this.secAudioFileName = this.generateAudioFileName();
                    this.secAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.secAudioFileName;
                    this.secAudio = this.media.create(this.secAudioFilePath);
                }
                this.secAudio.startRecord();
                this.secRecording = true;
            }
            else if (root == "trdChoice") {
                if (this.platform.is('ios')) {
                    this.trdAudioFileName = this.generateAudioFileName();
                    this.trdAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.trdAudioFileName;
                    this.trdAudio = this.media.create(this.trdAudioFilePath);
                }
                else if (this.platform.is('android')) {
                    this.trdAudioFileName = this.generateAudioFileName();
                    this.trdAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.trdAudioFileName;
                    this.trdAudio = this.media.create(this.trdAudioFilePath);
                }
                this.trdAudio.startRecord();
                this.trdRecording = true;
            }
        }
        else {
            alert("Please fill the related name for inserting this voice!");
        }
    };
    // Generate the name by Datetime of system
    SelectiontypequestionsPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";
        return newFileName;
    };
    //the method for stopping the recorder
    SelectiontypequestionsPage.prototype.stopAudio = function (root, voiceNameEn, voiceNameAr) {
        if ((voiceNameEn != null) && (voiceNameAr != null)) {
            if (root == "question") {
                this.questionAudio.stopRecord();
                this.myQuestionAudio = 'data:audio/m4a;base64, ' + this.questionAudio;
                this.recording = false;
                // Insert & Upload Question Voice
                this.insertVoice(this.questionAudiofileName, this.questionAudioFilePath, voiceNameEn, voiceNameAr, root);
            }
            else if (root == "fstChoice") {
                this.fstAudio.stopRecord();
                this.fstRecording = false;
                // Insert & Upload Question Voice
                this.insertVoice(this.fstAudioFileName, this.fstAudioFilePath, voiceNameEn, voiceNameAr, root);
            }
            else if (root == "secChoice") {
                this.secAudio.stopRecord();
                this.secRecording = false;
                // Insert & Upload Question Voice
                this.insertVoice(this.secAudioFileName, this.secAudioFilePath, voiceNameEn, voiceNameAr, root);
            }
            else if (root == "trdChoice") {
                this.trdAudio.stopRecord();
                this.trdRecording = false;
                // Insert & Upload Question Voice
                this.insertVoice(this.trdAudioFileName, this.trdAudioFilePath, voiceNameEn, voiceNameAr, root);
            }
        }
    };
    // the method for playing recorded Audio
    SelectiontypequestionsPage.prototype.playAudio = function (file, root) {
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
        else if (root == "fstChoice") {
            if (this.platform.is('ios')) {
                this.fstAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.fstAudio = this.media.create(this.fstAudioFilePath);
            }
            else if (this.platform.is('android')) {
                this.fstAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.fstAudio = this.media.create(this.fstAudioFilePath);
            }
            this.fstAudio.play();
            this.fstAudio.setVolume(0.8);
        }
        else if (root == "secChoice") {
            if (this.platform.is('ios')) {
                this.secAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.secAudio = this.media.create(this.secAudioFilePath);
            }
            else if (this.platform.is('android')) {
                this.secAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.secAudio = this.media.create(this.secAudioFilePath);
            }
            this.secAudio.play();
            this.secAudio.setVolume(0.8);
        }
        else if (root == "trdChoice") {
            if (this.platform.is('ios')) {
                this.trdAudioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
                this.trdAudio = this.media.create(this.trdAudioFilePath);
            }
            else if (this.platform.is('android')) {
                this.trdAudioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
                this.trdAudio = this.media.create(this.trdAudioFilePath);
            }
            this.trdAudio.play();
            this.trdAudio.setVolume(0.8);
        }
    };
    SelectiontypequestionsPage.prototype.insertVoice = function (audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {
        var _this = this;
        // Upload Voice
        this.uploadAudio(audioFileName, audioFilePath);
        this.network.insertVoice(audioFileName, audioNameEn, audioNameAr).then(function (data) {
            if (root == "question") {
                _this.myQuestionVoiceID = _this.showData(data);
            }
            else if (root == "fstChoice") {
                _this.myFstVoiceID = _this.showData(data);
            }
            else if (root == "secChoice") {
                _this.mySecVoiceID = _this.showData(data);
            }
            else if (root == "trdChoice") {
                _this.myTrdVoiceID = _this.showData(data);
            }
            //alert("the ID of latest inserted Voice: " + voiceID);
        }, function (err) {
            alert(err);
        });
    };
    // the method for uploading voice recordings
    SelectiontypequestionsPage.prototype.uploadAudio = function (audioFileName, audioFilePath) {
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
    // ************** Selection Choices ****************
    // fill the First Choice after choosing the Selection Choice.
    SelectiontypequestionsPage.prototype.onCloseFstChoice = function () {
        this.fstNameEn = this.fstChoice.NameEn;
        this.fstNameAr = this.fstChoice.NameAr;
        this.fstNameAz = this.fstChoice.NameAz;
        this.fstImage = this.network.mainUploadImgUrl + this.fstChoice.Image;
        this.fstVoice = this.fstChoice.VoiceEn;
    };
    // fill the Second Choice after Choosing the Selection Choice.
    SelectiontypequestionsPage.prototype.onCloseSecChoice = function () {
        this.secNameEn = this.secChoice.NameEn;
        this.secNameAr = this.secChoice.NameAr;
        this.secNameAz = this.secChoice.NameAz;
        this.secImage = this.network.mainUploadImgUrl + this.secChoice.Image;
        this.secVoice = this.secChoice.VoiceEn;
    };
    // fill the Second Choice after Choosing the Selection Choice.
    SelectiontypequestionsPage.prototype.onCloseTrdChoice = function () {
        this.trdNameEn = this.trdChoice.NameEn;
        this.trdNameAr = this.trdChoice.NameAr;
        this.trdNameAz = this.trdChoice.NameAz;
        this.trdImage = this.network.mainUploadImgUrl + this.trdChoice.Image;
        this.trdVoice = this.trdChoice.VoiceEn;
    };
    SelectiontypequestionsPage.prototype.onCloseCorrectChoice = function () {
        console.log('The correct Choice/s is: ' + this.correctChoice.choices);
    };
    // Insert First Choice
    SelectiontypequestionsPage.prototype.insertFstChoice = function (fstChoiceEn, fstChoiceAr, fstChoiceAz) {
        var _this = this;
        if (fstChoiceEn == null) {
            fstChoiceEn = "";
        }
        if (fstChoiceAr == null) {
            fstChoiceAr = "";
        }
        if (fstChoiceAz == null) {
            fstChoiceAz = "";
        }
        if (this.myFstImgID == null) {
            this.myFstImgID = 1;
        }
        if (this.myFstVoiceID == null) {
            this.myFstVoiceID = 1;
        }
        if (this.fstChoice == null) {
            this.network.insertSelectionCoice(fstChoiceEn, fstChoiceAr, fstChoiceAz, this.myFstImgID, this.myFstVoiceID).then(function (data) {
                _this.myFstChoiceID = _this.showData(data);
                console.log('the myFstChoiceID is: ' + _this.myFstChoiceID);
                _this.presentToast('First Choice has been inserted successfully...');
            }, function (err) {
                alert(err);
            });
        }
        else {
            this.myFstChoiceID = this.fstChoice.SID;
        }
    };
    // Insert Second Choice
    SelectiontypequestionsPage.prototype.insertSecChoice = function (secChoiceEn, secChoiceAr, secChoiceAz) {
        var _this = this;
        if (secChoiceEn == null) {
            secChoiceEn = "";
        }
        if (secChoiceAr == null) {
            secChoiceAr = "";
        }
        if (secChoiceAz == null) {
            secChoiceAz = "";
        }
        if (this.mySecImgID == null) {
            this.mySecImgID = 1;
        }
        if (this.mySecVoiceID == null) {
            this.mySecVoiceID = 1;
        }
        if (this.secChoice == null) {
            this.network.insertSelectionCoice(secChoiceEn, secChoiceAr, secChoiceAz, this.mySecImgID, this.mySecVoiceID).then(function (data) {
                _this.mySecChoiceID = _this.showData(data);
                console.log('the mySecChoiceID is: ' + _this.mySecChoiceID);
                _this.presentToast('Second Choice has been inserted successfully...');
            }, function (err) {
                alert(err);
            });
        }
        else {
            this.mySecChoiceID = this.secChoice.SID;
        }
    };
    // Insert Third Choice
    SelectiontypequestionsPage.prototype.insertTrdChoice = function (trdChoiceEn, trdChoiceAr, trdChoiceAz) {
        var _this = this;
        if (trdChoiceEn == null) {
            trdChoiceEn = "";
        }
        if (trdChoiceAr == null) {
            trdChoiceAr = "";
        }
        if (trdChoiceAz == null) {
            trdChoiceAz = "";
        }
        if (this.myTrdImgID == null) {
            this.myTrdImgID = 1;
        }
        if (this.myTrdVoiceID == null) {
            this.myTrdVoiceID = 1;
        }
        if (this.trdChoice == null) {
            this.network.insertSelectionCoice(trdChoiceEn, trdChoiceAr, trdChoiceAz, this.myTrdImgID, this.myTrdVoiceID).then(function (data) {
                _this.myTrdChoiceID = _this.showData(data);
                console.log('the myTrdChoiceID is: ' + _this.myTrdChoiceID);
                _this.presentToast('Third Choice has been inserted successfully...');
            }, function (err) {
                alert(err);
            });
        }
        else {
            this.myTrdChoiceID = this.trdChoice.SID;
        }
    };
    SelectiontypequestionsPage.prototype.insertQuestion = function (name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {
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
            this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz, this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 2).then(function (data) {
                _this.myQuestionID = _this.showData(data);
                console.log('The inserted Question ID is: ' + _this.myQuestionID);
                _this.presentToast('The Question has been inserted. with the QuestionID: ' + _this.myQuestionID);
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the Required fields');
        }
    };
    // **************** the Inserting Question Answer ******************
    SelectiontypequestionsPage.prototype.insertQuestionAnswer = function () {
        var _this = this;
        if (this.myFstChoiceID == null) {
            this.myFstChoiceID = 1;
        }
        if (this.mySecChoiceID == null) {
            this.mySecChoiceID = 1;
        }
        if (this.myTrdChoiceID == null) {
            this.myTrdChoiceID = 1;
        }
        var multiSelection;
        if (this.multi === true) {
            multiSelection = 1;
        }
        else {
            multiSelection = 0;
        }
        console.log('The multi is: ' + this.multi);
        console.log('The multiSelection is: ' + multiSelection);
        // insert Question Answer to tbl_SelectionAnswersType
        var myAnswerID;
        this.network.insertSelectionAnswer(this.myQuestionID, multiSelection, this.myFstChoiceID, this.mySecChoiceID, this.myTrdChoiceID, this.correctChoice.choices).then(function (data) {
            myAnswerID = _this.showData(data);
            _this.presentToast('The Question has been inserted. with the QuestionID: ' + _this.myQuestionID + ' and AnswerID: ' + myAnswerID);
            console.log('The insertSelectionAnswer ID is: ' + myAnswerID);
        }, function (err) {
            alert(err);
        });
    };
    SelectiontypequestionsPage.prototype.showData = function (data) {
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
    ], SelectiontypequestionsPage.prototype, "selectComponent", void 0);
    SelectiontypequestionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-selectiontypequestions',
            templateUrl: './selectiontypequestions.page.html',
            styleUrls: ['./selectiontypequestions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Camera, File, HttpClient,
            WebView, Storage, Platform,
            LoadingController, ChangeDetectorRef,
            ActionSheetController, ToastController,
            FileTransfer, NavController, Media, Platform,
            NetworkEngineService])
    ], SelectiontypequestionsPage);
    return SelectiontypequestionsPage;
}());
export { SelectiontypequestionsPage };
//# sourceMappingURL=selectiontypequestions.page.js.map