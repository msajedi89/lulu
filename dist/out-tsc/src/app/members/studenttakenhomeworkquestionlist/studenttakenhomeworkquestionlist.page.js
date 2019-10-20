import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var STUDENTHOMEWORKID = 'homeworkid';
var QUESTIONID = 'questionid';
var ROOT = 'questionroot';
var LANGUAGE = 'language';
var StudenttakenhomeworkquestionlistPage = /** @class */ (function () {
    function StudenttakenhomeworkquestionlistPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.stHomeworkID = '';
        this.homework = '';
        this.questions = '';
        this.imagePath = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    StudenttakenhomeworkquestionlistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.network.mainUploadImgUrl;
        this.storage.get(STUDENTHOMEWORKID).then(function (stHomeworkId) {
            _this.stHomeworkID = stHomeworkId;
            console.log('the stHomeworkID is: ' + _this.stHomeworkID);
            _this.network.getStudentHomeworkByID(_this.stHomeworkID).then(function (homeworkData) {
                var jsonArray = homeworkData;
                _this.homework = jsonArray[0];
                console.log('I received Homework: ' + JSON.stringify(_this.homework));
                var QIDs = _this.homework.QListIDs;
                _this.network.getQuestionGeneralInfoByID(QIDs).then(function (questionData) {
                    _this.questions = questionData;
                    console.log('the jsonArray2: ' + JSON.stringify(_this.questions));
                });
            });
        });
    };
    StudenttakenhomeworkquestionlistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'listofstudenttakenhomework']);
    };
    StudenttakenhomeworkquestionlistPage.prototype.goToQuestion = function (questionType, qID) {
        var _this = this;
        console.log('the questionType is: ' + questionType);
        this.storage.set(QUESTIONID, qID).then(function () {
            _this.storage.set(ROOT, 'homework').then(function () {
                switch (questionType) {
                    case '1':
                        _this.router.navigate(['members', 'evaluationofdragdropquestions']);
                        break;
                    case '2':
                        _this.router.navigate(['members', 'evaluationofselectivequestion']);
                        break;
                    case '3':
                        _this.router.navigate(['members', 'evaluationofdragtotablequestion']);
                        break;
                    case '4':
                        _this.router.navigate(['members', 'evaluationofdescriptivequestions']);
                        break;
                    case '5':
                        _this.router.navigate(['members', 'evaluationofdrawingquestions']);
                        break;
                    case '6':
                        _this.router.navigate(['members', 'evaluationofrecitequranquestions']);
                        break;
                    default:
                        break;
                }
            });
        });
    };
    StudenttakenhomeworkquestionlistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studenttakenhomeworkquestionlist',
            templateUrl: './studenttakenhomeworkquestionlist.page.html',
            styleUrls: ['./studenttakenhomeworkquestionlist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudenttakenhomeworkquestionlistPage);
    return StudenttakenhomeworkquestionlistPage;
}());
export { StudenttakenhomeworkquestionlistPage };
//# sourceMappingURL=studenttakenhomeworkquestionlist.page.js.map