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
var StudentexamquestionslistPage = /** @class */ (function () {
    function StudentexamquestionslistPage(storage, router, platform, network, navCtrl) {
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
    StudentexamquestionslistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.network.mainUploadImgUrl;
        this.storage.get(STUDENTEXAMID).then(function (stExamId) {
            _this.stExamID = stExamId;
            console.log('the stExamID is: ' + _this.stExamID);
            _this.network.getStudentExamByID(_this.stExamID).then(function (examData) {
                var jsonArray = examData;
                _this.exam = jsonArray[0];
                console.log('I received Exam: ' + JSON.stringify(_this.exam));
                // get the data from Cache
                _this.storage.get(_this.stExamID).then(function (resultData) {
                    if (resultData != null) {
                        console.log('this is from cache..');
                        _this.questions = resultData;
                    }
                    else {
                        // get the Questions list from Exam Data
                        var QIDs = _this.exam.QListIDs;
                        _this.network.getQuestionGeneralInfoByID(QIDs).then(function (questionData) {
                            _this.questions = questionData;
                            console.log('the questions: ' + JSON.stringify(_this.questions));
                            // set the data to Cache
                            _this.storage.set(_this.stExamID, _this.questions).then(function (resultOfCaching) {
                                console.log('the result of Caching is: ' + JSON.stringify(resultOfCaching));
                            });
                        });
                    }
                });
            });
        });
    };
    StudentexamquestionslistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'listofstudentexams']);
    };
    StudentexamquestionslistPage.prototype.showData = function (data) {
        var jsonArray = data;
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.questions.push(jsonObject);
        }
    };
    StudentexamquestionslistPage.prototype.goToQuestion = function (position, questionType, qID) {
        var _this = this;
        this.questions[position] = '';
        console.log('the new questions: ' + JSON.stringify(this.questions));
        this.storage.set(this.stExamID, this.questions).then(function (result) {
            console.log('the storage has been updated. the new Data: ' + result);
            console.log('the questionType is: ' + questionType);
            _this.storage.set(QUESTIONID, qID).then(function () {
                _this.storage.set(ROOT, 'exam').then(function () {
                    switch (questionType) {
                        case '1':
                            _this.router.navigate(['members', 'studentsdragdrop']);
                            break;
                        case '2':
                            _this.router.navigate(['members', 'studentselectivequestions']);
                            break;
                        case '3':
                            _this.router.navigate(['members', 'studentsdragtotablequestion']);
                            break;
                        case '4':
                            _this.router.navigate(['members', 'studentdescriptivequestion']);
                            break;
                        case '5':
                            _this.router.navigate(['members', 'studentdrawingquestion']);
                            break;
                        case '6':
                            _this.router.navigate(['members', 'studentrecitequran']);
                            break;
                        default:
                            break;
                    }
                });
            });
        });
    };
    StudentexamquestionslistPage.prototype.finishExam = function () {
        var _this = this;
        this.storage.remove(this.stExamID);
        this.network.updateStudentExam(this.stExamID, 1, 1, 1).then(function (updateResult) {
            console.log('the result of Updating Student Exam is: ' + updateResult);
            _this.router.navigate(['members', 'dashboard']);
        });
    };
    StudentexamquestionslistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentexamquestionslist',
            templateUrl: './studentexamquestionslist.page.html',
            styleUrls: ['./studentexamquestionslist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudentexamquestionslistPage);
    return StudentexamquestionslistPage;
}());
export { StudentexamquestionslistPage };
//# sourceMappingURL=studentexamquestionslist.page.js.map