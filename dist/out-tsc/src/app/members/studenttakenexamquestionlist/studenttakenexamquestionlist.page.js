import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var STUDENTEXAMID = 'examid';
var QUESTIONID = 'questionid';
var ROOT = 'questionroot';
var LANGUAGE = 'language';
var StudenttakenexamquestionlistPage = /** @class */ (function () {
    function StudenttakenexamquestionlistPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.stExamID = '';
        this.exam = '';
        this.questions = '';
        this.imagePath = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    StudenttakenexamquestionlistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.network.mainUploadImgUrl;
        this.storage.get(STUDENTEXAMID).then(function (stExamId) {
            _this.stExamID = stExamId;
            console.log('the stExamID is: ' + _this.stExamID);
            _this.network.getStudentExamByID(_this.stExamID).then(function (examData) {
                var jsonArray = examData;
                _this.exam = jsonArray[0];
                console.log('I received Exam: ' + JSON.stringify(_this.exam));
                // get the Questions list from Exam Data
                var QIDs = _this.exam.QListIDs;
                _this.network.getQuestionGeneralInfoByID(QIDs).then(function (questionData) {
                    _this.questions = questionData;
                    console.log('the jsonArray2: ' + JSON.stringify(_this.questions));
                });
            });
        });
    };
    StudenttakenexamquestionlistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'listofstudentstakenexam']);
    };
    StudenttakenexamquestionlistPage.prototype.goToQuestion = function (questionType, qID) {
        var _this = this;
        console.log('the questionType is: ' + questionType);
        this.storage.set(QUESTIONID, qID).then(function () {
            _this.storage.set(ROOT, 'exam').then(function () {
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
    StudenttakenexamquestionlistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studenttakenexamquestionlist',
            templateUrl: './studenttakenexamquestionlist.page.html',
            styleUrls: ['./studenttakenexamquestionlist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudenttakenexamquestionlistPage);
    return StudenttakenexamquestionlistPage;
}());
export { StudenttakenexamquestionlistPage };
//# sourceMappingURL=studenttakenexamquestionlist.page.js.map