import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
var WHOIS = 'whois';
var EvaluationofdragdropquestionsPage = /** @class */ (function () {
    function EvaluationofdragdropquestionsPage(router, platform, network, navCtrl, storage, toastCtrl) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.question = '';
        this.answer = '';
        this.fstImageInfo = '';
        this.fstImage = '';
        this.secImageInfo = '';
        this.secImage = '';
        this.trdImageInfo = '';
        this.trdImage = '';
        // fstRealChoice
        this.q1 = [];
        // secRealChoice
        this.q2 = [];
        // trdRealChoice
        this.q3 = [];
        this.q4 = [];
        // the variable for Rooting
        this.fromWhere = 'exam';
        // ***** the variables for Evaluation *****
        this.studentAnswer = '';
        // the variables for showing student results along with Evaluation
        this.stFstChoice = [];
        this.stSecChoice = [];
        this.stTrdChoice = [];
        // the variable for determinig that who entered this page
        this.whoIs = '';
        // Student entered this page or Teacher
        this.storage.get(WHOIS).then(function (resultWhoIS) {
            _this.whoIs = resultWhoIS;
            console.log('the whoIs is: ' + _this.whoIs);
        });
    }
    EvaluationofdragdropquestionsPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Student ID
        this.storage.get(USERID).then(function (resultUserID) {
            _this.stID = resultUserID;
            console.log('the stID is: ' + _this.stID);
            // get the Question ID
            _this.storage.get(QUESTIONID).then(function (resultQID) {
                _this.QID = resultQID;
                console.log('the QID is: ' + _this.QID);
                // get the Root
                _this.storage.get(ROOT).then(function (whereResult) {
                    _this.fromWhere = whereResult;
                    console.log('from Where: ' + _this.fromWhere);
                    if (_this.fromWhere == 'exam') {
                        // get the Student Exam ID
                        _this.storage.get(STUDENTEXAMID).then(function (resultstExamID) {
                            _this.stExamID = resultstExamID;
                            console.log('the stExamID is: ' + _this.stExamID);
                            // get the question
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('I received Question: ' + JSON.stringify(data));
                            });
                            // get the Question's Answer
                            _this.network.getDragDropAnswerQuestionByID(_this.QID).then(function (answerData) {
                                var jsonArray2 = answerData;
                                _this.answer = jsonArray2[0];
                                console.log('I received Answer: ' + JSON.stringify(answerData));
                                var fstImgID = _this.answer.RightOneImage;
                                var secImgID = _this.answer.RightTwoImage;
                                var trdImgID = _this.answer.RightThreeImage;
                                if (_this.answer.LeftOneEn != null) {
                                    _this.q1.push(_this.answer.LeftOneEn);
                                }
                                if (_this.answer.LeftOneAr != null) {
                                    _this.q1.push(_this.answer.LeftOneAr);
                                }
                                if (_this.answer.LeftOneAz != null) {
                                    _this.q1.push(_this.answer.LeftOneAz);
                                }
                                if (_this.answer.LeftTwoEn != null) {
                                    _this.q2.push(_this.answer.LeftTwoEn);
                                }
                                if (_this.answer.LeftTwoAr != null) {
                                    _this.q2.push(_this.answer.LeftTwoAr);
                                }
                                if (_this.answer.LeftTwoAz != null) {
                                    _this.q2.push(_this.answer.LeftTwoAz);
                                }
                                if (_this.answer.LeftThreeEn != null) {
                                    _this.q3.push(_this.answer.LeftThreeEn);
                                }
                                if (_this.answer.LeftThreeAr != null) {
                                    _this.q3.push(_this.answer.LeftThreeAr);
                                }
                                if (_this.answer.LeftThreeAz != null) {
                                    _this.q3.push(_this.answer.LeftThreeAz);
                                }
                                // get the First Image
                                if (fstImgID != 1) {
                                    _this.network.getImageByID(fstImgID).then(function (fstImgData) {
                                        var jsonArray3 = fstImgData;
                                        _this.fstImageInfo = jsonArray3[0];
                                        _this.fstImage = _this.network.mainUploadImgUrl + _this.fstImageInfo.Image;
                                    });
                                }
                                // get the Second Image
                                if (secImgID != 1) {
                                    _this.network.getImageByID(secImgID).then(function (secImgData) {
                                        var jsonArray4 = secImgData;
                                        _this.secImageInfo = jsonArray4[0];
                                        _this.secImage = _this.network.mainUploadImgUrl + _this.secImageInfo.Image;
                                    });
                                }
                                // get the Third Image
                                if (trdImgID != 1) {
                                    _this.network.getImageByID(trdImgID).then(function (trdImgData) {
                                        var jsonArray5 = trdImgData;
                                        _this.trdImageInfo = jsonArray5[0];
                                        _this.trdImage = _this.network.mainUploadImgUrl + _this.trdImageInfo.Image;
                                    });
                                }
                                // ********** get Student Answer **********
                                _this.network.getStudentDragDropAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray6 = stAnswerData;
                                    _this.studentAnswer = jsonArray6[0];
                                    console.log('the studentAnswer is: ' + JSON.stringify(_this.studentAnswer));
                                    // get the Student Exam/Homework Question ID
                                    if (_this.fromWhere == 'exam') {
                                        _this.stExamQuestionID = _this.studentAnswer.eqID;
                                    }
                                    else if (_this.fromWhere == 'homework') {
                                        _this.stExamQuestionID = _this.studentAnswer.hwkQID;
                                    }
                                    _this.stFstChoice = [];
                                    _this.stSecChoice = [];
                                    _this.stTrdChoice = [];
                                    // Evaluate First Choice of Student
                                    var found = false;
                                    var x = _this.studentAnswer.DragOne;
                                    var fstStAnswer = x.split(',');
                                    console.log('the fstStAnswer is: ' + fstStAnswer);
                                    if (fstStAnswer.length > 0) {
                                        for (var i = 0; i < fstStAnswer.length; i++) {
                                            var textX = fstStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q1.length; j++) {
                                                if (textX == _this.q1[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stFstChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stFstChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                    // Evaluate the Second Choice of Student
                                    var y = _this.studentAnswer.DragTwo;
                                    var secStAnswer = y.split(',');
                                    console.log('the secStAnswer is: ' + secStAnswer);
                                    if (secStAnswer.length > 0) {
                                        for (var i = 0; i < secStAnswer.length; i++) {
                                            var textX = secStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q2.length; j++) {
                                                if (textX == _this.q2[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stSecChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stSecChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                    // Evaluate the Third Choice of Student
                                    var z = _this.studentAnswer.DragThree;
                                    var trdStAnswer = z.split(',');
                                    console.log('the trdStAnswer is: ' + trdStAnswer);
                                    if (trdStAnswer.length > 0) {
                                        for (var i = 0; i < trdStAnswer.length; i++) {
                                            var textX = trdStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q3.length; j++) {
                                                if (textX == _this.q3[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTrdChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stTrdChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                });
                            });
                        });
                    }
                    else {
                        // get the Student Homework ID
                        _this.storage.get(STUDENTHOMEWORKID).then(function (resultstExamID) {
                            _this.stExamID = resultstExamID;
                            console.log('the stHomeworkID is: ' + _this.stExamID);
                            // get the question
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('I received Question: ' + JSON.stringify(data));
                            });
                            // get the Question's Answer
                            _this.network.getDragDropAnswerQuestionByID(_this.QID).then(function (answerData) {
                                var jsonArray2 = answerData;
                                _this.answer = jsonArray2[0];
                                console.log('I received Answer: ' + JSON.stringify(answerData));
                                var fstImgID = _this.answer.RightOneImage;
                                var secImgID = _this.answer.RightTwoImage;
                                var trdImgID = _this.answer.RightThreeImage;
                                if (_this.answer.LeftOneEn != null) {
                                    _this.q1.push(_this.answer.LeftOneEn);
                                }
                                if (_this.answer.LeftOneAr != null) {
                                    _this.q1.push(_this.answer.LeftOneAr);
                                }
                                if (_this.answer.LeftOneAz != null) {
                                    _this.q1.push(_this.answer.LeftOneAz);
                                }
                                if (_this.answer.LeftTwoEn != null) {
                                    _this.q2.push(_this.answer.LeftTwoEn);
                                }
                                if (_this.answer.LeftTwoAr != null) {
                                    _this.q2.push(_this.answer.LeftTwoAr);
                                }
                                if (_this.answer.LeftTwoAz != null) {
                                    _this.q2.push(_this.answer.LeftTwoAz);
                                }
                                if (_this.answer.LeftThreeEn != null) {
                                    _this.q3.push(_this.answer.LeftThreeEn);
                                }
                                if (_this.answer.LeftThreeAr != null) {
                                    _this.q3.push(_this.answer.LeftThreeAr);
                                }
                                if (_this.answer.LeftThreeAz != null) {
                                    _this.q3.push(_this.answer.LeftThreeAz);
                                }
                                // get the First Image
                                if (fstImgID != 1) {
                                    _this.network.getImageByID(fstImgID).then(function (fstImgData) {
                                        var jsonArray3 = fstImgData;
                                        _this.fstImageInfo = jsonArray3[0];
                                        _this.fstImage = _this.network.mainUploadImgUrl + _this.fstImageInfo.Image;
                                    });
                                }
                                // get the Second Image
                                if (secImgID != 1) {
                                    _this.network.getImageByID(secImgID).then(function (secImgData) {
                                        var jsonArray4 = secImgData;
                                        _this.secImageInfo = jsonArray4[0];
                                        _this.secImage = _this.network.mainUploadImgUrl + _this.secImageInfo.Image;
                                    });
                                }
                                // get the Third Image
                                if (trdImgID != 1) {
                                    _this.network.getImageByID(trdImgID).then(function (trdImgData) {
                                        var jsonArray5 = trdImgData;
                                        _this.trdImageInfo = jsonArray5[0];
                                        _this.trdImage = _this.network.mainUploadImgUrl + _this.trdImageInfo.Image;
                                    });
                                }
                                // ********** get Student Answer **********
                                _this.network.getStudentDragDropAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray6 = stAnswerData;
                                    _this.studentAnswer = jsonArray6[0];
                                    console.log('the studentAnswer is: ' + JSON.stringify(_this.studentAnswer));
                                    // get the Student Exam/Homework Question ID
                                    if (_this.fromWhere == 'exam') {
                                        _this.stExamQuestionID = _this.studentAnswer.eqID;
                                    }
                                    else if (_this.fromWhere == 'homework') {
                                        _this.stExamQuestionID = _this.studentAnswer.hwkQID;
                                    }
                                    _this.stFstChoice = [];
                                    _this.stSecChoice = [];
                                    _this.stTrdChoice = [];
                                    // Evaluate First Choice of Student
                                    var found = false;
                                    var x = _this.studentAnswer.DragOne;
                                    var fstStAnswer = x.split(',');
                                    console.log('the fstStAnswer is: ' + fstStAnswer);
                                    if (fstStAnswer.length > 0) {
                                        for (var i = 0; i < fstStAnswer.length; i++) {
                                            var textX = fstStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q1.length; j++) {
                                                if (textX == _this.q1[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stFstChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stFstChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                    // Evaluate the Second Choice of Student
                                    var y = _this.studentAnswer.DragTwo;
                                    var secStAnswer = y.split(',');
                                    console.log('the secStAnswer is: ' + secStAnswer);
                                    if (secStAnswer.length > 0) {
                                        for (var i = 0; i < secStAnswer.length; i++) {
                                            var textX = secStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q2.length; j++) {
                                                if (textX == _this.q2[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stSecChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stSecChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                    // Evaluate the Third Choice of Student
                                    var z = _this.studentAnswer.DragThree;
                                    var trdStAnswer = z.split(',');
                                    console.log('the trdStAnswer is: ' + trdStAnswer);
                                    if (trdStAnswer.length > 0) {
                                        for (var i = 0; i < trdStAnswer.length; i++) {
                                            var textX = trdStAnswer[i];
                                            found = false;
                                            for (var j = 0; j < _this.q3.length; j++) {
                                                if (textX == _this.q3[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTrdChoice.push({ value: textX, color: '#6BC357' });
                                            }
                                            else {
                                                _this.stTrdChoice.push({ value: textX, color: '#F3534B' });
                                            }
                                        }
                                    }
                                });
                            });
                        });
                    }
                });
            });
        });
    };
    EvaluationofdragdropquestionsPage.prototype.goBack = function () {
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
    EvaluationofdragdropquestionsPage.prototype.recordScore = function (score, evaluationDescription) {
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
    EvaluationofdragdropquestionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-evaluationofdragdropquestions',
            templateUrl: './evaluationofdragdropquestions.page.html',
            styleUrls: ['./evaluationofdragdropquestions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EvaluationofdragdropquestionsPage);
    return EvaluationofdragdropquestionsPage;
}());
export { EvaluationofdragdropquestionsPage };
//# sourceMappingURL=evaluationofdragdropquestions.page.js.map