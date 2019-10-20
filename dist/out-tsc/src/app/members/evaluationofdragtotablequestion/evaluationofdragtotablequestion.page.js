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
var EvaluationofdragtotablequestionPage = /** @class */ (function () {
    function EvaluationofdragtotablequestionPage(router, platform, network, navCtrl, storage, toastCtrl) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.question = '';
        this.answer = '';
        this.q1 = [];
        this.q2 = [];
        this.q3 = [];
        this.q4 = [];
        this.q5 = [];
        // the variables to hold the Texts
        this.text1 = '';
        this.text2 = '';
        this.text3 = '';
        this.text4 = '';
        this.text5 = '';
        this.text6 = '';
        // ******** the variables for Evaluation ********
        this.studentAnswer = '';
        this.stTableOne = [];
        this.stTableTwo = [];
        // the variable for determinig that who entered this page
        this.whoIs = '';
        // Student entered this page or Teacher
        this.storage.get(WHOIS).then(function (resultWhoIS) {
            _this.whoIs = resultWhoIS;
            console.log('the whoIs is: ' + _this.whoIs);
        });
    }
    EvaluationofdragtotablequestionPage.prototype.ngOnInit = function () {
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
                            // *********** get the question ***********
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('I received Question: ' + JSON.stringify(data));
                                console.log('the question QID: ' + _this.question.QID);
                            });
                            // ************* get the question's Answer **************
                            _this.network.getDragToTableAnswersByID(_this.QID).then(function (answerData) {
                                var jsonArray2 = answerData;
                                _this.answer = jsonArray2[0];
                                console.log('I received Question: ' + JSON.stringify(_this.answer));
                                // ***** Split the text and get the Texts *****
                                var temp = _this.answer.TblOneTexts;
                                var tblOneTexts = temp.split(',');
                                if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) {
                                    _this.text1 = tblOneTexts[0];
                                    console.log('the First text: ' + _this.text1);
                                }
                                if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) {
                                    _this.text2 = tblOneTexts[1];
                                    console.log('the Second text: ' + _this.text2);
                                }
                                if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) {
                                    _this.text3 = tblOneTexts[2];
                                    console.log('the third text: ' + _this.text3);
                                }
                                temp = _this.answer.TblTwoTexts;
                                var tblTwoTexts = temp.split(',');
                                if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) {
                                    _this.text4 = tblTwoTexts[0];
                                    console.log('the Fourth text: ' + _this.text4);
                                }
                                if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) {
                                    _this.text5 = tblTwoTexts[1];
                                    console.log('the Fifth text: ' + _this.text5);
                                }
                                if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) {
                                    _this.text6 = tblTwoTexts[2];
                                    console.log('the Sixth text: ' + _this.text6);
                                }
                                if (_this.text1 != '') {
                                    _this.q1.push(_this.text1);
                                }
                                if (_this.text2 != '') {
                                    _this.q1.push(_this.text2);
                                }
                                if (_this.text3 != '') {
                                    _this.q1.push(_this.text3);
                                }
                                if (_this.text4 != '') {
                                    _this.q2.push(_this.text4);
                                }
                                if (_this.text5 != '') {
                                    _this.q2.push(_this.text5);
                                }
                                if (_this.text6 != '') {
                                    _this.q2.push(_this.text6);
                                }
                                // ******** Process of Evaluation *********
                                // get the student's answer
                                _this.network.getStudentDragToTableAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray3 = stAnswerData;
                                    _this.studentAnswer = jsonArray3[0];
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
                                        var x = _this.studentAnswer.TableOne;
                                        _this.stTableOneTexts = x.split(',');
                                        console.log('the stTableOneTexts: ' + _this.stTableOneTexts);
                                        var y = _this.studentAnswer.TableTwo;
                                        _this.stTableTwoTexts = y.split(',');
                                        console.log('the stTableTwoTexts: ' + _this.stTableTwoTexts);
                                        // evaluate of First Table
                                        var textX = '';
                                        var found = false;
                                        for (var i = 0; i < _this.stTableOneTexts.length; i++) {
                                            textX = _this.stTableOneTexts[i];
                                            found = false;
                                            for (var j = 0; j < _this.q1.length; j++) {
                                                if (textX == _this.q1[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTableOne.push({ value: textX, color: 'green' });
                                            }
                                            else {
                                                _this.stTableOne.push({ value: textX, color: 'red' });
                                            }
                                        }
                                        // Evaluate of Second Table
                                        textX = '';
                                        found = false;
                                        for (var i = 0; i < _this.stTableTwoTexts.length; i++) {
                                            textX = _this.stTableTwoTexts[i];
                                            found = false;
                                            for (var j = 0; j < _this.q2.length; j++) {
                                                if (textX == _this.q2[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTableTwo.push({ value: textX, color: 'green' });
                                            }
                                            else {
                                                _this.stTableTwo.push({ value: textX, color: 'red' });
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
                            // *********** get the question ***********
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('I received Question: ' + JSON.stringify(data));
                                console.log('the question QID: ' + _this.question.QID);
                            });
                            // ************* get the question's Answer **************
                            _this.network.getDragToTableAnswersByID(_this.QID).then(function (answerData) {
                                var jsonArray2 = answerData;
                                _this.answer = jsonArray2[0];
                                console.log('I received Question: ' + JSON.stringify(_this.answer));
                                // ***** Split the text and get the Texts *****
                                var temp = _this.answer.TblOneTexts;
                                var tblOneTexts = temp.split(',');
                                if ((tblOneTexts[0] != null) && (tblOneTexts[0] != '')) {
                                    _this.text1 = tblOneTexts[0];
                                    console.log('the First text: ' + _this.text1);
                                }
                                if ((tblOneTexts[1] != null) && (tblOneTexts[1] != '')) {
                                    _this.text2 = tblOneTexts[1];
                                    console.log('the Second text: ' + _this.text2);
                                }
                                if ((tblOneTexts[2] != null) && (tblOneTexts[2] != '')) {
                                    _this.text3 = tblOneTexts[2];
                                    console.log('the third text: ' + _this.text3);
                                }
                                temp = _this.answer.TblTwoTexts;
                                var tblTwoTexts = temp.split(',');
                                if ((tblTwoTexts[0] != null) && (tblTwoTexts[0] != '')) {
                                    _this.text4 = tblTwoTexts[0];
                                    console.log('the Fourth text: ' + _this.text4);
                                }
                                if ((tblTwoTexts[1] != null) && (tblTwoTexts[1] != '')) {
                                    _this.text5 = tblTwoTexts[1];
                                    console.log('the Fifth text: ' + _this.text5);
                                }
                                if ((tblTwoTexts[2] != null) && (tblTwoTexts[2] != '')) {
                                    _this.text6 = tblTwoTexts[2];
                                    console.log('the Sixth text: ' + _this.text6);
                                }
                                if (_this.text1 != '') {
                                    _this.q1.push(_this.text1);
                                }
                                if (_this.text2 != '') {
                                    _this.q1.push(_this.text2);
                                }
                                if (_this.text3 != '') {
                                    _this.q1.push(_this.text3);
                                }
                                if (_this.text4 != '') {
                                    _this.q2.push(_this.text4);
                                }
                                if (_this.text5 != '') {
                                    _this.q2.push(_this.text5);
                                }
                                if (_this.text6 != '') {
                                    _this.q2.push(_this.text6);
                                }
                                // ******** Process of Evaluation *********
                                // get the student's answer
                                _this.network.getStudentDragToTableAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray3 = stAnswerData;
                                    _this.studentAnswer = jsonArray3[0];
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
                                        var x = _this.studentAnswer.TableOne;
                                        _this.stTableOneTexts = x.split(',');
                                        console.log('the stTableOneTexts: ' + _this.stTableOneTexts);
                                        var y = _this.studentAnswer.TableTwo;
                                        _this.stTableTwoTexts = y.split(',');
                                        console.log('the stTableTwoTexts: ' + _this.stTableTwoTexts);
                                        // evaluate of First Table
                                        var textX = '';
                                        var found = false;
                                        for (var i = 0; i < _this.stTableOneTexts.length; i++) {
                                            textX = _this.stTableOneTexts[i];
                                            found = false;
                                            for (var j = 0; j < _this.q1.length; j++) {
                                                if (textX == _this.q1[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTableOne.push({ value: textX, color: 'green' });
                                            }
                                            else {
                                                _this.stTableOne.push({ value: textX, color: 'red' });
                                            }
                                        }
                                        // Evaluate of Second Table
                                        textX = '';
                                        found = false;
                                        for (var i = 0; i < _this.stTableTwoTexts.length; i++) {
                                            textX = _this.stTableTwoTexts[i];
                                            found = false;
                                            for (var j = 0; j < _this.q2.length; j++) {
                                                if (textX == _this.q2[j]) {
                                                    found = true;
                                                }
                                            }
                                            if (found == true) {
                                                _this.stTableTwo.push({ value: textX, color: 'green' });
                                            }
                                            else {
                                                _this.stTableTwo.push({ value: textX, color: 'red' });
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
    EvaluationofdragtotablequestionPage.prototype.goBack = function () {
        if (this.whoIs == 'student') {
            if (this.fromWhere == 'exam') {
                this.router.navigate(['members', 'studenttakenexamquestionlist']);
            }
            else {
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
    EvaluationofdragtotablequestionPage.prototype.recordScore = function (score, evaluationDescription) {
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
    EvaluationofdragtotablequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-evaluationofdragtotablequestion',
            templateUrl: './evaluationofdragtotablequestion.page.html',
            styleUrls: ['./evaluationofdragtotablequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EvaluationofdragtotablequestionPage);
    return EvaluationofdragtotablequestionPage;
}());
export { EvaluationofdragtotablequestionPage };
//# sourceMappingURL=evaluationofdragtotablequestion.page.js.map