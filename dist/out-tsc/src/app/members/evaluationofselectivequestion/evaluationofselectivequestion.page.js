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
var EvaluationofselectivequestionPage = /** @class */ (function () {
    function EvaluationofselectivequestionPage(router, platform, network, navCtrl, storage, toastCtrl) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.question = '';
        this.answer = '';
        // determines that the Question is single Selection or Multi
        this.isMulti = false;
        // the Choice's ID
        this.fstChoiceID = '';
        this.secChoiceID = '';
        this.trdChoiceID = '';
        // the variables for holding the Choices information
        this.fstChoice = '';
        this.secChoice = '';
        this.trdChoice = '';
        // the variables for choice's Image
        this.fstChoiceImg = '';
        this.secChoiceImg = '';
        this.trdChoiceImg = '';
        // the variable to record Student's Selects
        this.studentSelects = '';
        // the variables for Evaluating and Shownig the Correct Answers.
        this.oneColor = 'white';
        this.twoColor = 'white';
        this.threeColor = 'white';
        this.oneReal = false;
        this.twoReal = false;
        this.threeReal = false;
        this.stOne = false;
        this.stTwo = false;
        this.stThree = false;
        this.studentAnswer = '';
        // the variable for determinig that who entered this page
        this.whoIs = '';
        // Student entered this page or Teacher
        this.storage.get(WHOIS).then(function (resultWhoIS) {
            _this.whoIs = resultWhoIS;
            console.log('the whoIs is: ' + _this.whoIs);
        });
    }
    EvaluationofselectivequestionPage.prototype.ngOnInit = function () {
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
                                console.log('the question: ' + JSON.stringify(_this.question));
                            });
                            // get the question' Answer
                            _this.network.getSelectiveQuestionAnswersByID(_this.QID).then(function (Answerdata) {
                                var jsonArray2 = Answerdata;
                                _this.answer = jsonArray2[0];
                                console.log('the Questions Answer: ' + JSON.stringify(_this.answer));
                                // get the Correct Choices
                                var x = _this.answer.RightAnswers;
                                _this.correctChoices = x.split(',');
                                console.log('the correctChoices: ' + _this.correctChoices);
                                _this.isMulti = _this.answer.Multi;
                                _this.fstChoiceID = _this.answer.FirstChoice;
                                _this.secChoiceID = _this.answer.SecChoice;
                                _this.trdChoiceID = _this.answer.ThirdChoice;
                                console.log('Selection State: ' + _this.isMulti);
                                console.log('the fstChoiceID: ' + _this.fstChoiceID);
                                console.log('the secChoiceID: ' + _this.secChoiceID);
                                console.log('the trdChoiceID: ' + _this.trdChoiceID);
                                if (_this.fstChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.fstChoiceID).then(function (fstData) {
                                        var jsonArray3 = fstData;
                                        _this.fstChoice = jsonArray3[0];
                                        _this.fstChoiceImg = _this.network.mainUploadImgUrl + _this.fstChoice.Image;
                                        console.log('the fstChoice Data: ' + JSON.stringify(_this.fstChoice));
                                    });
                                }
                                if (_this.secChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.secChoiceID).then(function (secData) {
                                        var jsonArray4 = secData;
                                        _this.secChoice = jsonArray4[0];
                                        _this.secChoiceImg = _this.network.mainUploadImgUrl + _this.secChoice.Image;
                                        console.log('the secChoice Data: ' + _this.secChoice);
                                    });
                                }
                                if (_this.trdChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.trdChoiceID).then(function (trdData) {
                                        var jsonArray5 = trdData;
                                        _this.trdChoice = jsonArray5[0];
                                        _this.trdChoiceImg = _this.network.mainUploadImgUrl + _this.trdChoice.Image;
                                        console.log('the trdChoice Data: ' + _this.trdChoice);
                                    });
                                }
                                // get the Student Answer
                                _this.network.getStudentSelectiveAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray6 = stAnswerData;
                                    _this.studentAnswer = jsonArray6[0];
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
                                        var y = _this.studentAnswer.StudentChoices;
                                        _this.studentChoices = y.split(',');
                                        // ******* Determine the Correct Choices *******
                                        var isIn = false;
                                        // Check the First choice is Answer or not?
                                        isIn = _this.findx(1, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.oneReal = true;
                                            console.log('the oneReal is: ' + _this.oneReal);
                                        }
                                        // Check the Second choice is Answer or not?
                                        isIn = _this.findx(2, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.twoReal = true;
                                            console.log('the twoReal is: ' + _this.twoReal);
                                        }
                                        // Check the Third choice is Answer or not?
                                        isIn = _this.findx(3, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.threeReal = true;
                                            console.log('the threeReal is: ' + _this.threeReal);
                                        }
                                        // ******* get the Students Choices *******
                                        // Check the Student Choose the First Choice or not?
                                        isIn = false;
                                        isIn = _this.findx(1, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stOne = true;
                                            console.log('the stOne is: ' + _this.stOne);
                                        }
                                        // Check the Student Choose the Second Choice or not?
                                        isIn = _this.findx(2, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stTwo = true;
                                            console.log('the stTwo is: ' + _this.stTwo);
                                        }
                                        // Check the Student Choose the Third Choice or not?
                                        isIn = _this.findx(3, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stThree = true;
                                            console.log('the stThree is: ' + _this.stThree);
                                        }
                                        // ******* Evaluation Process *******
                                        // evaluate the First Choice
                                        if (_this.oneReal == true) {
                                            if (_this.stOne == true) {
                                                _this.oneColor = '#6BC357';
                                            }
                                            else {
                                                _this.oneColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stOne == true) {
                                                _this.oneColor = '#F3534B';
                                            }
                                            else {
                                                _this.oneColor = '#b9d6da';
                                            }
                                        }
                                        // evaluate the Second Choice
                                        if (_this.twoReal == true) {
                                            if (_this.stTwo == true) {
                                                _this.twoColor = '#6BC357';
                                            }
                                            else {
                                                _this.twoColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stTwo == true) {
                                                _this.twoColor = '#F3534B';
                                            }
                                            else {
                                                _this.twoColor = '#b9d6da';
                                            }
                                        }
                                        // evaluate the Third Choice
                                        if (_this.threeReal == true) {
                                            if (_this.stThree == true) {
                                                _this.threeColor = '#6BC357';
                                            }
                                            else {
                                                _this.threeColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stThree == true) {
                                                _this.threeColor = '#F3534B';
                                            }
                                            else {
                                                _this.threeColor = '#b9d6da';
                                            }
                                        }
                                    }
                                });
                            });
                        });
                    }
                    else if (_this.fromWhere == 'homework') {
                        // get the Student Homework ID
                        _this.storage.get(STUDENTHOMEWORKID).then(function (resultstExamID) {
                            _this.stExamID = resultstExamID;
                            console.log('the stHomeworkID is: ' + _this.stExamID);
                            // get the question
                            _this.network.getQuestionByID(_this.QID).then(function (data) {
                                var jsonArray = data;
                                _this.question = jsonArray[0];
                                console.log('the question: ' + JSON.stringify(_this.question));
                            });
                            // get the question' Answer
                            _this.network.getSelectiveQuestionAnswersByID(_this.QID).then(function (Answerdata) {
                                var jsonArray2 = Answerdata;
                                _this.answer = jsonArray2[0];
                                console.log('the Questions Answer: ' + JSON.stringify(_this.answer));
                                // get the Correct Choices
                                var x = _this.answer.RightAnswers;
                                _this.correctChoices = x.split(',');
                                console.log('the correctChoices: ' + _this.correctChoices);
                                _this.isMulti = _this.answer.Multi;
                                _this.fstChoiceID = _this.answer.FirstChoice;
                                _this.secChoiceID = _this.answer.SecChoice;
                                _this.trdChoiceID = _this.answer.ThirdChoice;
                                console.log('Selection State: ' + _this.isMulti);
                                console.log('the fstChoiceID: ' + _this.fstChoiceID);
                                console.log('the secChoiceID: ' + _this.secChoiceID);
                                console.log('the trdChoiceID: ' + _this.trdChoiceID);
                                if (_this.fstChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.fstChoiceID).then(function (fstData) {
                                        var jsonArray3 = fstData;
                                        _this.fstChoice = jsonArray3[0];
                                        _this.fstChoiceImg = _this.network.mainUploadImgUrl + _this.fstChoice.Image;
                                        console.log('the fstChoice Data: ' + JSON.stringify(_this.fstChoice));
                                    });
                                }
                                if (_this.secChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.secChoiceID).then(function (secData) {
                                        var jsonArray4 = secData;
                                        _this.secChoice = jsonArray4[0];
                                        _this.secChoiceImg = _this.network.mainUploadImgUrl + _this.secChoice.Image;
                                        console.log('the secChoice Data: ' + _this.secChoice);
                                    });
                                }
                                if (_this.trdChoiceID != null) {
                                    _this.network.getSelectionChoicesByID(_this.trdChoiceID).then(function (trdData) {
                                        var jsonArray5 = trdData;
                                        _this.trdChoice = jsonArray5[0];
                                        _this.trdChoiceImg = _this.network.mainUploadImgUrl + _this.trdChoice.Image;
                                        console.log('the trdChoice Data: ' + _this.trdChoice);
                                    });
                                }
                                // get the Student Answer
                                _this.network.getStudentSelectiveAnswer(_this.stID, _this.stExamID, _this.QID, _this.fromWhere).then(function (stAnswerData) {
                                    var jsonArray6 = stAnswerData;
                                    _this.studentAnswer = jsonArray6[0];
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
                                        var y = _this.studentAnswer.StudentChoices;
                                        _this.studentChoices = y.split(',');
                                        // ******* Determine the Correct Choices *******
                                        var isIn = false;
                                        // Check the First choice is Answer or not?
                                        isIn = _this.findx(1, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.oneReal = true;
                                            console.log('the oneReal is: ' + _this.oneReal);
                                        }
                                        // Check the Second choice is Answer or not?
                                        isIn = _this.findx(2, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.twoReal = true;
                                            console.log('the twoReal is: ' + _this.twoReal);
                                        }
                                        // Check the Third choice is Answer or not?
                                        isIn = _this.findx(3, _this.correctChoices);
                                        if (isIn == true) {
                                            _this.threeReal = true;
                                            console.log('the threeReal is: ' + _this.threeReal);
                                        }
                                        // ******* get the Students Choices *******
                                        // Check the Student Choose the First Choice or not?
                                        isIn = false;
                                        isIn = _this.findx(1, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stOne = true;
                                            console.log('the stOne is: ' + _this.stOne);
                                        }
                                        // Check the Student Choose the Second Choice or not?
                                        isIn = _this.findx(2, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stTwo = true;
                                            console.log('the stTwo is: ' + _this.stTwo);
                                        }
                                        // Check the Student Choose the Third Choice or not?
                                        isIn = _this.findx(3, _this.studentChoices);
                                        if (isIn == true) {
                                            _this.stThree = true;
                                            console.log('the stThree is: ' + _this.stThree);
                                        }
                                        // ******* Evaluation Process *******
                                        // evaluate the First Choice
                                        if (_this.oneReal == true) {
                                            if (_this.stOne == true) {
                                                _this.oneColor = '#6BC357';
                                            }
                                            else {
                                                _this.oneColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stOne == true) {
                                                _this.oneColor = '#F3534B';
                                            }
                                            else {
                                                _this.oneColor = '#b9d6da';
                                            }
                                        }
                                        // evaluate the Second Choice
                                        if (_this.twoReal == true) {
                                            if (_this.stTwo == true) {
                                                _this.twoColor = '#6BC357';
                                            }
                                            else {
                                                _this.twoColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stTwo == true) {
                                                _this.twoColor = '#F3534B';
                                            }
                                            else {
                                                _this.twoColor = '#b9d6da';
                                            }
                                        }
                                        // evaluate the Third Choice
                                        if (_this.threeReal == true) {
                                            if (_this.stThree == true) {
                                                _this.threeColor = '#6BC357';
                                            }
                                            else {
                                                _this.threeColor = 'yellow';
                                            }
                                        }
                                        else {
                                            if (_this.stThree == true) {
                                                _this.threeColor = '#F3534B';
                                            }
                                            else {
                                                _this.threeColor = '#b9d6da';
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
    EvaluationofselectivequestionPage.prototype.findx = function (x, collection) {
        var found = false;
        for (var i = 0; i < collection.length; i++) {
            if (x == collection[i]) {
                found = true;
            }
        }
        return found;
    };
    EvaluationofselectivequestionPage.prototype.goBack = function () {
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
    EvaluationofselectivequestionPage.prototype.recordScore = function (score, evaluationDescription) {
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
    EvaluationofselectivequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-evaluationofselectivequestion',
            templateUrl: './evaluationofselectivequestion.page.html',
            styleUrls: ['./evaluationofselectivequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EvaluationofselectivequestionPage);
    return EvaluationofselectivequestionPage;
}());
export { EvaluationofselectivequestionPage };
//# sourceMappingURL=evaluationofselectivequestion.page.js.map