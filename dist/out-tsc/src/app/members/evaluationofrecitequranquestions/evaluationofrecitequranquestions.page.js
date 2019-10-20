import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
var WHOIS = 'whois';
var EvaluationofrecitequranquestionsPage = /** @class */ (function () {
    function EvaluationofrecitequranquestionsPage(router, platform, network, navCtrl, storage, toastCtrl) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.question = '';
        this.studentAnswer = '';
        // the variable for determinig that who entered this page
        this.whoIs = '';
        // Student entered this page or Teacher
        this.storage.get(WHOIS).then(function (resultWhoIS) {
            _this.whoIs = resultWhoIS;
            console.log('the whoIs is: ' + _this.whoIs);
        });
    }
    EvaluationofrecitequranquestionsPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Student ID
        this.storage.get(USERID).then(function (resultUserID) {
            _this.stID = resultUserID;
            console.log('the stID is: ' + _this.stID);
            // get the Question ID
            _this.storage.get(QUESTIONID).then(function (resultQID) {
                _this.QID = resultQID;
                // get the Root
                _this.storage.get(ROOT).then(function (whereResult) {
                    _this.fromWhere = whereResult;
                    console.log('from Where: ' + _this.fromWhere);
                    if (_this.fromWhere == 'exam') {
                        // ********************* get the Student Exam ID **********************
                        _this.storage.get(STUDENTEXAMID).then(function (resultstExamID) {
                            _this.stExamID = resultstExamID;
                            console.log('the stExamID is: ' + _this.stExamID);
                            // get the question
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('the question: ' + JSON.stringify(_this.question));
                                // get the Student Answer
                                _this.network.getStudentReciteQuranAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray2 = stAnswerData;
                                    _this.studentAnswer = jsonArray2[0];
                                    console.log('the studentAnswer: ' + JSON.stringify(_this.studentAnswer));
                                    if (_this.studentAnswer == '0') {
                                        _this.toastCtrl.create({
                                            message: 'Student did not answer this Question',
                                            duration: 4000
                                        }).then(function (toast) { return toast.present(); });
                                    }
                                    else {
                                        // get the Student Exam/Homework Question ID
                                        if (_this.fromWhere == 'exam') {
                                            _this.stExamQuestionID = _this.studentAnswer.eqID;
                                        }
                                        else if (_this.fromWhere == 'homework') {
                                            _this.stExamQuestionID = _this.studentAnswer.hwkQID;
                                        }
                                        _this.stVoice = new Audio();
                                        _this.stVoice.src = _this.network.mainStudentsVoiceUrl + _this.studentAnswer.stQuran;
                                        _this.stVoice.load();
                                    }
                                });
                            });
                        });
                    }
                    else {
                        // ****************** get the Student Homework ID **********************
                        _this.storage.get(STUDENTHOMEWORKID).then(function (resultstExamID) {
                            _this.stExamID = resultstExamID;
                            console.log('the stHomeworkID is: ' + _this.stExamID);
                            // get the question
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('the question: ' + JSON.stringify(_this.question));
                                // get the Student Answer
                                _this.network.getStudentReciteQuranAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray2 = stAnswerData;
                                    _this.studentAnswer = jsonArray2[0];
                                    console.log('the studentAnswer: ' + JSON.stringify(_this.studentAnswer));
                                    if (_this.studentAnswer == '0') {
                                        _this.toastCtrl.create({
                                            message: 'Student did not answer this Question',
                                            duration: 4000
                                        }).then(function (toast) { return toast.present(); });
                                    }
                                    else {
                                        // get the Student Exam/Homework Question ID
                                        if (_this.fromWhere == 'exam') {
                                            _this.stExamQuestionID = _this.studentAnswer.eqID;
                                        }
                                        else if (_this.fromWhere == 'homework') {
                                            _this.stExamQuestionID = _this.studentAnswer.hwkQID;
                                        }
                                        _this.stVoice = new Audio();
                                        _this.stVoice.src = _this.network.mainStudentsVoiceUrl + _this.studentAnswer.stQuran;
                                        _this.stVoice.load();
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
    };
    EvaluationofrecitequranquestionsPage.prototype.playAudio = function () {
        this.stVoice.play();
    };
    EvaluationofrecitequranquestionsPage.prototype.stopAudio = function () {
        this.stVoice.pause();
    };
    EvaluationofrecitequranquestionsPage.prototype.goBack = function () {
        if (this.whoIs == 'student') {
            if (this.fromWhere == 'exam') {
                this.router.navigate(['members', 'studenttakenexamquestionlist']);
            }
            else if (this.fromWhere == 'homework') {
                this.router.navigate(['members', 'studenttakenhomeworkquestionlist']);
            }
        }
        else {
            if (this.fromWhere == 'exam') {
                this.router.navigate(['members', 'examevaluation']);
            }
            else {
                this.router.navigate(['members', 'homeworkevaluation']);
            }
        }
    };
    // *********** record the given score ***********
    EvaluationofrecitequranquestionsPage.prototype.recordScore = function (score, evaluationDescription) {
        var _this = this;
        if (score != null) {
            if (evaluationDescription == null) {
                evaluationDescription = '';
            }
            this.network.recordStudentScore(this.stExamQuestionID, score, evaluationDescription, this.fromWhere).then(function (resultScore) {
                console.log('the resultScore is: ' + resultScore);
                _this.toastCtrl.create({
                    message: 'Score Recorded',
                    duration: 3000
                }).then(function (toast) { return toast.present(); });
            });
        }
    };
    EvaluationofrecitequranquestionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-evaluationofrecitequranquestions',
            templateUrl: './evaluationofrecitequranquestions.page.html',
            styleUrls: ['./evaluationofrecitequranquestions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EvaluationofrecitequranquestionsPage);
    return EvaluationofrecitequranquestionsPage;
}());
export { EvaluationofrecitequranquestionsPage };
//# sourceMappingURL=evaluationofrecitequranquestions.page.js.map