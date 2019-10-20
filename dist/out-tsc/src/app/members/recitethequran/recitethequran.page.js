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
var RecitethequranPage = /** @class */ (function () {
    function RecitethequranPage(router, platform, network, toastController, actionSheetController, camera, transfer, navCtrl, media, file) {
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
        this.myQuestionImgID = 1;
    }
    RecitethequranPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get Main Titles
            _this.network.getMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        });
    };
    RecitethequranPage.prototype.goBack = function () {
        this.router.navigate(['members', 'questions']);
    };
    // ***************** Main Title Select *****************
    RecitethequranPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    RecitethequranPage.prototype.onClose = function () {
        var _this = this;
        // get the Sub Title of Chosen Main Title
        this.network.getSubTitles(this.mainTitle.mtID).then(function (data) {
            console.log('I recieved Sub Title: ' + JSON.stringify(data));
            _this.subTitles = data;
        });
    };
    // show a Toast.
    RecitethequranPage.prototype.presentToast = function (text) {
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
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    RecitethequranPage.prototype.startAudio = function (root, voiceNameEn, voiceNameAr) {
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
    RecitethequranPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";
        return newFileName;
    };
    //the method for stopping the recorder
    RecitethequranPage.prototype.stopAudio = function (root, voiceNameEn, voiceNameAr) {
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
    RecitethequranPage.prototype.playAudio = function (file, root) {
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
    RecitethequranPage.prototype.insertVoice = function (audioFileName, audioFilePath, audioNameEn, audioNameAr, root) {
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
    RecitethequranPage.prototype.uploadAudio = function (audioFileName, audioFilePath) {
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
    RecitethequranPage.prototype.insertQuestion = function (name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {
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
        // ****** insert Question ******
        if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {
            var myQuestionID_1;
            this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz, this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 6).then(function (data) {
                myQuestionID_1 = _this.showData(data);
                console.log("The inserted Question ID is: " + myQuestionID_1);
                _this.presentToast("A new Question with this ID: " + myQuestionID_1 + " has been inserted.");
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Please fill the Required fields");
        }
    };
    RecitethequranPage.prototype.showData = function (data) {
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
    ], RecitethequranPage.prototype, "selectComponent", void 0);
    RecitethequranPage = tslib_1.__decorate([
        Component({
            selector: 'app-recitethequran',
            templateUrl: './recitethequran.page.html',
            styleUrls: ['./recitethequran.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, Camera, FileTransfer, NavController,
            Media, File])
    ], RecitethequranPage);
    return RecitethequranPage;
}());
export { RecitethequranPage };
//# sourceMappingURL=recitethequran.page.js.map