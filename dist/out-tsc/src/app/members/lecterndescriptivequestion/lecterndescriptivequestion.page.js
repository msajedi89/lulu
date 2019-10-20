import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { PopoverComponent } from 'src/app/popover/popover.component';
var LECTERNQUESTIONID = 'lecternqid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var LecterndescriptivequestionPage = /** @class */ (function () {
    function LecterndescriptivequestionPage(router, platform, network, popoverCtrl, navCtrl, storage, transfer, media, file) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.transfer = transfer;
        this.media = media;
        this.file = file;
        this.question = '';
        this.questionImage = '';
        // required variables for Student Voice
        this.recording = false;
        this.stVoiceFileName = '';
        // a variable to check if the voice has been uploaded or not
        this.voiceUploaded = false;
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
    }
    LecterndescriptivequestionPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Question ID
        this.storage.get(LECTERNQUESTIONID).then(function (resultQID) {
            _this.QID = resultQID;
            // get the question
            _this.network.getQuestionByID(_this.QID).then(function (data) {
                var jsonArray = data;
                _this.question = jsonArray[0];
                console.log('the question QID: ' + _this.question.QID);
                console.log('the QuestionImage: ' + _this.question.QuestionImage);
                _this.network.getImageByID(_this.question.QuestionImage).then(function (imgData) {
                    var jsonArray2 = imgData;
                    var image = jsonArray2[0];
                    console.log('the Image FileName: ' + image.Image);
                    _this.questionImage = _this.network.mainUploadImgUrl + image.Image;
                    // get the question Voice
                    _this.questionVoice = new Audio();
                    _this.questionVoice.src = _this.network.mainQuestionVoicesUrl + _this.question.VoiceEn;
                    _this.questionVoice.load();
                    // get the descriptions for pop up
                    _this.descriptionEn = _this.question.Description;
                    _this.descriptionAr = _this.question.DescriptionAr;
                });
            });
        });
    };
    LecterndescriptivequestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternquestionspage']);
    };
    // play the Question Voice
    LecterndescriptivequestionPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    LecterndescriptivequestionPage.prototype.presentPopover = function (ev) {
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
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    LecterndescriptivequestionPage.prototype.startAudio = function () {
        if (this.platform.is('ios')) {
            this.stVoiceFileName = this.generateAudioFileName();
            this.stVoiceFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.stVoiceFileName;
            this.stVoice = this.media.create(this.stVoiceFilePath);
        }
        else if (this.platform.is('android')) {
            this.stVoiceFileName = this.generateAudioFileName();
            this.stVoiceFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.stVoiceFileName;
            this.stVoice = this.media.create(this.stVoiceFilePath);
        }
        this.stVoice.startRecord();
        this.recording = true;
    };
    // Generate the name by Datetime of system
    LecterndescriptivequestionPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".wav";
        return newFileName;
    };
    // the method for stopping the recorder
    LecterndescriptivequestionPage.prototype.stopAudio = function () {
        this.stVoice.stopRecord();
        this.myStudentVoice = 'data:audio/wav;base64, ' + this.stVoice;
        this.recording = false;
    };
    // the method for playing recorded Audio
    LecterndescriptivequestionPage.prototype.playAudio = function (file) {
        if (this.platform.is('ios')) {
            this.stVoiceFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
            this.stVoice = this.media.create(this.stVoiceFilePath);
        }
        else if (this.platform.is('android')) {
            this.stVoiceFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
            this.stVoice = this.media.create(this.stVoiceFilePath);
        }
        this.stVoice.play();
        this.stVoice.setVolume(0.8);
    };
    LecterndescriptivequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-lecterndescriptivequestion',
            templateUrl: './lecterndescriptivequestion.page.html',
            styleUrls: ['./lecterndescriptivequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, PopoverController,
            NavController, Storage, FileTransfer, Media, File])
    ], LecterndescriptivequestionPage);
    return LecterndescriptivequestionPage;
}());
export { LecterndescriptivequestionPage };
//# sourceMappingURL=lecterndescriptivequestion.page.js.map