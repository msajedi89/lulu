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
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var StudentrecitequranPage = /** @class */ (function () {
    function StudentrecitequranPage(router, platform, network, popoverCtrl, navCtrl, storage, transfer, media, file) {
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
        // required variables for Student Voice
        this.recording = false;
        this.stVoiceFileName = '';
        // a variable to check if the voice has been uploaded or not
        this.voiceUploaded = false;
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
    }
    StudentrecitequranPage.prototype.presentPopover = function (ev) {
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
    StudentrecitequranPage.prototype.ngOnInit = function () {
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
            // get the question
            _this.network.getQuestionByID(_this.QID).then(function (data) {
                var jsonArray = data;
                _this.question = jsonArray[0];
                console.log('the question QID: ' + _this.question.QID);
                // get the question Voice
                _this.questionVoice = new Audio();
                _this.questionVoice.src = _this.network.mainQuestionVoicesUrl + _this.question.VoiceEn;
                _this.questionVoice.load();
                // get the descriptions for pop up
                _this.descriptionEn = _this.question.Description;
                _this.descriptionAr = _this.question.DescriptionAr;
            });
        });
    };
    // play the Question Voice
    StudentrecitequranPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    StudentrecitequranPage.prototype.goBack = function () {
        if (this.fromWhere == 'exam') {
            this.router.navigate(['members', 'studentexamquestionslist']);
        }
        else if (this.fromWhere == 'homework') {
            this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
    };
    // **************** Question Audio Part *****************
    // the method for starting the recorder to record audio
    StudentrecitequranPage.prototype.startAudio = function () {
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
    StudentrecitequranPage.prototype.generateAudioFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".m4a";
        return newFileName;
    };
    // the method for stopping the recorder
    StudentrecitequranPage.prototype.stopAudio = function () {
        this.stVoice.stopRecord();
        this.myStudentVoice = 'data:audio/m4a;base64, ' + this.stVoice;
        this.recording = false;
    };
    // the method for playing recorded Audio
    StudentrecitequranPage.prototype.playAudio = function (file) {
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
    // the method for uploading voice recordings
    StudentrecitequranPage.prototype.uploadAudio = function (audioFileName, audioFilePath) {
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'audio',
            fileName: audioFileName,
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: 'audio/mp3',
            headers: {}
        };
        fileTransfer.upload(audioFilePath, this.network.MainUploadStudentsVoiceAPI, options).then(function (data) {
            alert('The Audio has been uploaded.');
        }, function (err) {
            console.log(err);
            alert(err);
        });
    };
    // **************** Record the Student's Answer *********************
    StudentrecitequranPage.prototype.goNext = function () {
        var _this = this;
        // Upload the student voice if he/she record his/her voice
        if (this.stVoiceFileName != '') {
            this.uploadAudio(this.stVoiceFileName, this.stVoiceFilePath);
        }
        // record the result
        this.network.recordStudentReciteQuran(this.stExamID, this.stID, this.QID, this.stVoiceFileName, this.fromWhere).then(function (result) {
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
    StudentrecitequranPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentrecitequran',
            templateUrl: './studentrecitequran.page.html',
            styleUrls: ['./studentrecitequran.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, PopoverController,
            NavController, Storage, FileTransfer, Media, File])
    ], StudentrecitequranPage);
    return StudentrecitequranPage;
}());
export { StudentrecitequranPage };
//# sourceMappingURL=studentrecitequran.page.js.map