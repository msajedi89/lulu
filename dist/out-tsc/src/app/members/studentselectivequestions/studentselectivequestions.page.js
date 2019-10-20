import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverComponent } from 'src/app/popover/popover.component';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var StudentselectivequestionsPage = /** @class */ (function () {
    function StudentselectivequestionsPage(router, platform, network, navCtrl, storage, popoverCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.popoverCtrl = popoverCtrl;
        this.question = '';
        this.questionImage = '';
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
        // the variables to show which Choices are selected
        this.fstSelected = false;
        this.secSelected = false;
        this.trdSelected = false;
        // the variable to record Student's Selects
        this.studentSelects = '';
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
    }
    StudentselectivequestionsPage.prototype.presentPopover = function (ev) {
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
    StudentselectivequestionsPage.prototype.ngOnInit = function () {
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
            console.log('the QID is: ' + _this.QID);
            // get the question
            _this.network.getQuestionByID(_this.QID).then(function (data) {
                var jsonArray = data;
                _this.question = jsonArray[0];
                console.log('the question: ' + JSON.stringify(_this.question));
                // get the descriptions for pop up
                _this.descriptionEn = _this.question.Description;
                _this.descriptionAr = _this.question.DescriptionAr;
                // get the question Voice
                _this.questionVoice = new Audio();
                _this.questionVoice.src = _this.network.mainQuestionVoicesUrl + _this.question.VoiceEn;
                _this.questionVoice.load();
            });
            // get the question' Answer
            _this.network.getSelectiveQuestionAnswersByID(_this.QID).then(function (Answerdata) {
                var jsonArray2 = Answerdata;
                _this.answer = jsonArray2[0];
                console.log('the Questions Answer: ' + JSON.stringify(_this.answer));
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
                        // get the Selection Voice
                        _this.fstVoice = new Audio();
                        _this.fstVoice.src = _this.network.mainQuestionVoicesUrl + _this.fstChoice.VoiceEn;
                        _this.fstVoice.load();
                    });
                }
                if (_this.secChoiceID != null) {
                    _this.network.getSelectionChoicesByID(_this.secChoiceID).then(function (secData) {
                        var jsonArray4 = secData;
                        _this.secChoice = jsonArray4[0];
                        _this.secChoiceImg = _this.network.mainUploadImgUrl + _this.secChoice.Image;
                        console.log('the secChoice Data: ' + JSON.stringify(_this.secChoice));
                        // get the Selection Voice
                        _this.secVoice = new Audio();
                        _this.secVoice.src = _this.network.mainQuestionVoicesUrl + _this.secChoice.VoiceEn;
                        _this.secVoice.load();
                    });
                }
                if (_this.trdChoiceID != null) {
                    _this.network.getSelectionChoicesByID(_this.trdChoiceID).then(function (trdData) {
                        var jsonArray5 = trdData;
                        _this.trdChoice = jsonArray5[0];
                        _this.trdChoiceImg = _this.network.mainUploadImgUrl + _this.trdChoice.Image;
                        console.log('the trdChoice Data: ' + JSON.stringify(_this.trdChoice));
                        // get the Selection Voice
                        _this.trdVoice = new Audio();
                        _this.trdVoice.src = _this.network.mainQuestionVoicesUrl + _this.trdChoice.VoiceEn;
                        _this.trdVoice.load();
                    });
                }
            });
        });
    };
    // play the Question Voice
    StudentselectivequestionsPage.prototype.playVoice = function (rootVoice) {
        if (rootVoice == 'question') {
            this.questionVoice.play();
        }
        else if (rootVoice == 'fstChoice') {
            this.fstVoice.play();
        }
        else if (rootVoice == 'secChoice') {
            this.secVoice.play();
        }
        else if (rootVoice == 'trdChoice') {
            this.trdVoice.play();
        }
    };
    StudentselectivequestionsPage.prototype.goBack = function () {
        if (this.fromWhere == 'exam') {
            this.router.navigate(['members', 'studentexamquestionslist']);
        }
        else if (this.fromWhere == 'homework') {
            this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
    };
    StudentselectivequestionsPage.prototype.select = function (choice) {
        this.playVoice(choice);
        // *********** if the question is on Multi Selection ***********
        if (this.isMulti == true) {
            // change the color of First Choice on Click
            if (choice === 'fstChoice') {
                if (this.fstSelected === true) {
                    this.fstSelected = false;
                }
                else {
                    this.fstSelected = true;
                }
            }
            // change the color of Second Choice on Click
            if (choice === 'secChoice') {
                if (this.secSelected === true) {
                    this.secSelected = false;
                }
                else {
                    this.secSelected = true;
                }
            }
            // change the color of Third Choice on Click
            if (choice === 'trdChoice') {
                if (this.trdSelected === true) {
                    this.trdSelected = false;
                }
                else {
                    this.trdSelected = true;
                }
            }
        }
        else {
            // ********** if the question is on Single Selection Mode. ***********
            switch (choice) {
                case 'fstChoice':
                    this.fstSelected = true;
                    this.secSelected = false;
                    this.trdSelected = false;
                    break;
                case 'secChoice':
                    this.fstSelected = false;
                    this.secSelected = true;
                    this.trdSelected = false;
                    break;
                case 'trdChoice':
                    this.fstSelected = false;
                    this.secSelected = false;
                    this.trdSelected = true;
                    break;
                default:
                    break;
            }
        }
    };
    // *************** Record the Student's Answer ****************
    StudentselectivequestionsPage.prototype.goNext = function () {
        var _this = this;
        if ((this.fstSelected === false) && (this.secSelected === false) && (this.trdSelected === false)) {
            alert('Please Select one of the Choices');
        }
        else {
            this.studentSelects = '';
            if (this.isMulti == true) {
                if (this.fstSelected === true) {
                    this.studentSelects = '1,';
                }
                if (this.secSelected === true) {
                    this.studentSelects += '2,';
                }
                if (this.trdSelected === true) {
                    this.studentSelects += '3';
                }
            }
            else {
                if (this.fstSelected === true) {
                    this.studentSelects = '1';
                }
                if (this.secSelected === true) {
                    this.studentSelects = '2';
                }
                if (this.trdSelected === true) {
                    this.studentSelects = '3';
                }
            }
            console.log('the Students Answer: ' + this.studentSelects);
            /*let x = this.studentSelects.split(',');
            console.log('the result of Split: ' + x[0]);
            console.log('the result of Split: ' + x[1]);*/
            // *********** rercord the Answer to database ***********
            this.network.recordStudentSelectiveAnswer(this.stExamID, this.stID, this.QID, this.studentSelects, this.fromWhere).then(function (result) {
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
        }
    };
    StudentselectivequestionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentselectivequestions',
            templateUrl: './studentselectivequestions.page.html',
            styleUrls: ['./studentselectivequestions.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, PopoverController])
    ], StudentselectivequestionsPage);
    return StudentselectivequestionsPage;
}());
export { StudentselectivequestionsPage };
//# sourceMappingURL=studentselectivequestions.page.js.map