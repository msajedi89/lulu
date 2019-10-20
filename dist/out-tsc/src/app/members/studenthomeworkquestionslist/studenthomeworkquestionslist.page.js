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
var StudenthomeworkquestionslistPage = /** @class */ (function () {
    function StudenthomeworkquestionslistPage(storage, router, platform, network, navCtrl) {
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
    StudenthomeworkquestionslistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.imagePath = this.network.mainUploadImgUrl;
        this.storage.get(STUDENTHOMEWORKID).then(function (stHomeworkId) {
            _this.stHomeworkID = stHomeworkId;
            console.log('the stHomeworkID is: ' + _this.stHomeworkID);
            _this.network.getStudentHomeworkByID(_this.stHomeworkID).then(function (homeworkData) {
                var jsonArray = homeworkData;
                _this.homework = jsonArray[0];
                console.log('I received Homework: ' + JSON.stringify(_this.homework));
                // get the data from Cache
                _this.storage.get(_this.stHomeworkID).then(function (resultData) {
                    if (resultData != null) {
                        console.log('this is from cache..');
                        _this.questions = resultData;
                    }
                    else {
                        // get the Questions list from Exam Date
                        var QIDs = _this.homework.QListIDs;
                        _this.network.getQuestionGeneralInfoByID(QIDs).then(function (questionData) {
                            _this.questions = questionData;
                            console.log('the jsonArray2: ' + JSON.stringify(_this.questions));
                            // set the data to Cache
                            _this.storage.set(_this.stHomeworkID, _this.questions).then(function (resultOfCaching) {
                                console.log('the result of Caching is: ' + JSON.stringify(resultOfCaching));
                            });
                        });
                    }
                });
            });
        });
    };
    StudenthomeworkquestionslistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'listofstudenthomeworks']);
    };
    StudenthomeworkquestionslistPage.prototype.goToQuestion = function (position, questionType, qID) {
        var _this = this;
        this.questions[position] = '';
        console.log('the new questions: ' + JSON.stringify(this.questions));
        this.storage.set(this.stHomeworkID, this.questions).then(function (result) {
            console.log('the storage has been updated. the new Data: ' + result);
            console.log('the questionType is: ' + questionType);
            _this.storage.set(QUESTIONID, qID).then(function () {
                _this.storage.set(ROOT, 'homework').then(function () {
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
    StudenthomeworkquestionslistPage.prototype.finishHomework = function () {
        var _this = this;
        this.storage.remove(this.stHomeworkID);
        this.network.updateStudentHomework(this.stHomeworkID, 1, 1, 1).then(function (updateResult) {
            console.log('the result of Updating Student Homework is: ' + updateResult);
            _this.router.navigate(['members', 'dashboard']);
        });
    };
    StudenthomeworkquestionslistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studenthomeworkquestionslist',
            templateUrl: './studenthomeworkquestionslist.page.html',
            styleUrls: ['./studenthomeworkquestionslist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudenthomeworkquestionslistPage);
    return StudenthomeworkquestionslistPage;
}());
export { StudenthomeworkquestionslistPage };
//# sourceMappingURL=studenthomeworkquestionslist.page.js.map