import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { PopoverComponent } from 'src/app/popover/popover.component';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var StudentsdragtotablequestionPage = /** @class */ (function () {
    function StudentsdragtotablequestionPage(router, platform, network, navCtrl, storage, dragulaService, popoverCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.dragulaService = dragulaService;
        this.popoverCtrl = popoverCtrl;
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
        // the variable for determining of the arranges of Texts
        this.arrange = Math.floor(Math.random() * 3) + 1;
        // the variables for holding the result of Student's Answer
        this.stTableOne = '';
        this.stTableTwo = '';
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
        // set the drag event of Dragula
        this.dragulaService.drag('bag').subscribe(function (_a) {
            var name = _a.name, el = _a.el, source = _a.source;
            el.setAttribute('color', 'danger');
        });
    }
    StudentsdragtotablequestionPage.prototype.presentPopover = function (ev) {
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
    StudentsdragtotablequestionPage.prototype.ngOnInit = function () {
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
            // *********** get the question ***********
            _this.network.getQuestionByID(_this.QID).then(function (data) {
                var jsonArray = data;
                _this.question = jsonArray[0];
                console.log('I received Question: ' + JSON.stringify(data));
                // get the descriptions for pop up
                _this.descriptionEn = _this.question.Description;
                _this.descriptionAr = _this.question.DescriptionAr;
                // get the question Voice
                _this.questionVoice = new Audio();
                _this.questionVoice.src = _this.network.mainQuestionVoicesUrl + _this.question.VoiceEn;
                _this.questionVoice.load();
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
                // ***** Determine the arrange of Texts to show
                console.log('the arrange value: ' + _this.arrange);
                switch (_this.arrange) {
                    case 1:
                        if (_this.text2 != '') {
                            _this.q1.push({ value: _this.text2, color: 'secondary' });
                        }
                        if (_this.text4 != '') {
                            _this.q1.push({ value: _this.text4, color: 'secondary' });
                        }
                        if (_this.text3 != '') {
                            _this.q2.push({ value: _this.text3, color: 'secondary' });
                        }
                        if (_this.text5 != '') {
                            _this.q2.push({ value: _this.text5, color: 'secondary' });
                        }
                        if (_this.text1 != '') {
                            _this.q3.push({ value: _this.text1, color: 'secondary' });
                        }
                        if (_this.text6 != '') {
                            _this.q3.push({ value: _this.text6, color: 'secondary' });
                        }
                        break;
                    case 2:
                        if (_this.text3 != '') {
                            _this.q1.push({ value: _this.text3, color: 'secondary' });
                        }
                        if (_this.text6 != '') {
                            _this.q1.push({ value: _this.text6, color: 'secondary' });
                        }
                        if (_this.text1 != '') {
                            _this.q2.push({ value: _this.text1, color: 'secondary' });
                        }
                        if (_this.text2 != '') {
                            _this.q2.push({ value: _this.text2, color: 'secondary' });
                        }
                        if (_this.text4 != '') {
                            _this.q3.push({ value: _this.text4, color: 'secondary' });
                        }
                        if (_this.text5 != '') {
                            _this.q3.push({ value: _this.text5, color: 'secondary' });
                        }
                        break;
                    case 3:
                        if (_this.text5 != '') {
                            _this.q1.push({ value: _this.text5, color: 'secondary' });
                        }
                        if (_this.text2 != '') {
                            _this.q1.push({ value: _this.text2, color: 'secondary' });
                        }
                        if (_this.text4 != '') {
                            _this.q2.push({ value: _this.text4, color: 'secondary' });
                        }
                        if (_this.text3 != '') {
                            _this.q2.push({ value: _this.text3, color: 'secondary' });
                        }
                        if (_this.text6 != '') {
                            _this.q3.push({ value: _this.text6, color: 'secondary' });
                        }
                        if (_this.text1 != '') {
                            _this.q3.push({ value: _this.text1, color: 'secondary' });
                        }
                        break;
                    default:
                        break;
                }
            });
        });
    };
    // play the Question Voice
    StudentsdragtotablequestionPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    StudentsdragtotablequestionPage.prototype.goBack = function () {
        if (this.fromWhere == 'exam') {
            this.router.navigate(['members', 'studentexamquestionslist']);
        }
        else if (this.fromWhere == 'homework') {
            this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
    };
    // *********** Record the Student Answer ***********
    StudentsdragtotablequestionPage.prototype.goNext = function () {
        var _this = this;
        // get the result of first Table
        if (this.q4.length > 0) {
            this.stTableOne = this.q4[0].value;
            for (var i = 1; i < this.q4.length; i++) {
                var element = this.q4[i].value;
                this.stTableOne = this.stTableOne + ',' + element;
            }
        }
        // get the result of Second Table
        if (this.q5.length > 0) {
            this.stTableTwo = this.q5[0].value;
            for (var i = 1; i < this.q5.length; i++) {
                var element = this.q5[i].value;
                this.stTableTwo = this.stTableTwo + ',' + element;
            }
        }
        console.log('the TableOne Result: ' + this.stTableOne);
        console.log('the TableTwo Result: ' + this.stTableTwo);
        // record the result
        this.network.recordStudentDragToTableAnswer(this.stExamID, this.stID, this.QID, this.stTableOne, this.stTableTwo, this.fromWhere).then(function (result) {
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
    };
    StudentsdragtotablequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentsdragtotablequestion',
            templateUrl: './studentsdragtotablequestion.page.html',
            styleUrls: ['./studentsdragtotablequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, DragulaService, PopoverController])
    ], StudentsdragtotablequestionPage);
    return StudentsdragtotablequestionPage;
}());
export { StudentsdragtotablequestionPage };
//# sourceMappingURL=studentsdragtotablequestion.page.js.map