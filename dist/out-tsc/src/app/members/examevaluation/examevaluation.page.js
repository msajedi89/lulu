import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var studentKey = 'student';
var studentExamKey = 'studentexam';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var ExamevaluationPage = /** @class */ (function () {
    function ExamevaluationPage(router, platform, network, navCtrl, storage, toastController) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.profileImgUrl = '';
        this.studentExam = '';
    }
    ExamevaluationPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(studentKey).then(function (result) {
            _this.stID = result;
            console.log('this page recieved stID: ' + _this.stID);
            // get the Student
            _this.network.getStudentByID(_this.stID).then(function (data) {
                _this.showData(data);
                console.log('I recieved this Student: ' + JSON.stringify(data));
                _this.profileImgUrl = _this.network.mainStudentsProfileImgUrl + _this.profileImg;
                // 1-detection of entered Exam    2-get its information
                _this.storage.get(studentExamKey).then(function (resultExamID) {
                    _this.stExamID = resultExamID;
                    console.log('the stExamID: ' + _this.stExamID);
                    _this.network.getStudentExamByID(_this.stExamID).then(function (examData) {
                        var jsonArray2 = examData;
                        _this.studentExam = jsonArray2[0];
                        console.log('I received studentExam: ' + JSON.stringify(_this.studentExam));
                        // get the questions of this Exam
                        var QIDs = _this.studentExam.QListIDs;
                        console.log('the QIDs: ' + QIDs);
                        _this.network.getQuestionGeneralInfoByID(QIDs).then(function (questionsData) {
                            _this.questionsList = questionsData;
                            console.log('the questionsList: ' + JSON.stringify(_this.questionsList));
                        });
                    });
                });
            });
        });
    };
    ExamevaluationPage.prototype.goBack = function () {
        this.router.navigate(['members', 'studentsexamlist']);
    };
    // show a Toast.
    ExamevaluationPage.prototype.presentToast = function (text) {
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
    ExamevaluationPage.prototype.recordMark = function (mark) {
        var _this = this;
        if (mark != null) {
            this.network.recordStudentMark(this.stExamID, mark, 'exam').then(function (result) {
                console.log('the result of giving Mark is: ' + JSON.stringify(result));
                _this.presentToast('Mark saved successfully');
            });
        }
        else {
            alert('Please fill the Required fields');
        }
    };
    ExamevaluationPage.prototype.goToQuestion = function (qID, questionType) {
        var _this = this;
        console.log('the questionType is: ' + questionType);
        // set the Student ID
        this.storage.set(USERID, this.stID).then(function () {
            // set the Student Exam ID
            _this.storage.set(STUDENTEXAMID, _this.stExamID).then(function () {
                // set the Student Exam Question ID
                _this.storage.set(QUESTIONID, qID).then(function () {
                    // set the Root to define where to came back
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
            });
        });
    };
    ExamevaluationPage.prototype.showData = function (data) {
        var jsonArray = data;
        this.namefamily = [];
        this.profileImg = [];
        this.birthdate = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.namefamily.push(jsonObject.NameFamily);
            this.profileImg.push(jsonObject.ProfileImg);
            this.birthdate.push(jsonObject.Birthdate);
        }
    };
    ExamevaluationPage = tslib_1.__decorate([
        Component({
            selector: 'app-examevaluation',
            templateUrl: './examevaluation.page.html',
            styleUrls: ['./examevaluation.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], ExamevaluationPage);
    return ExamevaluationPage;
}());
export { ExamevaluationPage };
//# sourceMappingURL=examevaluation.page.js.map