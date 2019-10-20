import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/popover/popover.component';
var QUESTIONID = 'questionid';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var ROOT = 'questionroot';
var STUDENTHOMEWORKID = 'homeworkid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var StudentsdragdropPage = /** @class */ (function () {
    function StudentsdragdropPage(router, platform, network, navCtrl, storage, dragulaService, toastCtrl, popoverCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.dragulaService = dragulaService;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.question = '';
        this.answer = '';
        this.fstImageInfo = '';
        this.fstImage = '';
        this.secImageInfo = '';
        this.secImage = '';
        this.trdImageInfo = '';
        this.trdImage = '';
        this.q1 = [];
        this.q2 = [];
        this.q3 = [];
        this.q4 = [];
        this.todo = { value: '', color: '' };
        // the variable for Rooting
        this.fromWhere = 'exam';
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
        // save the results and go to the next Question
        this.dragOne = "";
        this.dragTwo = "";
        this.dragThree = "";
        // set the drag event of Dragula
        this.dragulaService.drag('bag').subscribe(function (_a) {
            var name = _a.name, el = _a.el, source = _a.source;
            el.setAttribute('color', 'danger');
        });
    }
    StudentsdragdropPage.prototype.presentPopover = function (ev) {
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
    StudentsdragdropPage.prototype.ngOnInit = function () {
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
        this.storage.get(QUESTIONID).then(function (resultQID) {
            _this.QID = resultQID;
            // get the question
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
            // get the Question's Answer
            _this.network.getDragDropAnswerQuestionByID(_this.QID).then(function (answerData) {
                var jsonArray2 = answerData;
                _this.answer = jsonArray2[0];
                console.log('I received Answer: ' + JSON.stringify(answerData));
                var fstImgID = _this.answer.RightOneImage;
                var secImgID = _this.answer.RightTwoImage;
                var trdImgID = _this.answer.RightThreeImage;
                if (_this.answer.LeftOneEn != null) {
                    _this.q4.push({ value: _this.answer.LeftOneEn, color: 'secondary' });
                }
                if (_this.answer.LeftOneAr != null) {
                    _this.q4.push({ value: _this.answer.LeftOneAr, color: 'secondary' });
                }
                if (_this.answer.LeftOneAz != null) {
                    _this.q4.push({ value: _this.answer.LeftOneAz, color: 'secondary' });
                }
                if (_this.answer.LeftTwoEn != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoEn, color: 'secondary' });
                }
                if (_this.answer.LeftTwoAr != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoAr, color: 'secondary' });
                }
                if (_this.answer.LeftTwoAz != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoAz, color: 'secondary' });
                }
                if (_this.answer.LeftThreeEn != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeEn, color: 'secondary' });
                }
                if (_this.answer.LeftThreeAr != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeAr, color: 'secondary' });
                }
                if (_this.answer.LeftThreeAz != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeAz, color: 'secondary' });
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
                console.log('the q4 before: ' + JSON.stringify(_this.q4));
                _this.q4 = _this.randomizeAnswers(_this.q4);
                console.log('the q4 after: ' + JSON.stringify(_this.q4));
            });
        });
    };
    // play the Question Voice
    StudentsdragdropPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    StudentsdragdropPage.prototype.randomizeAnswers = function (collection) {
        var a, b, temp;
        for (var i = 0; i < collection.length; i++) {
            var x = Math.floor(Math.random() * collection.length);
            var y = Math.floor(Math.random() * collection.length);
            a = collection[x];
            b = collection[y];
            temp = a;
            a = b;
            b = temp;
            collection[x] = a;
            collection[y] = b;
        }
        return collection;
    };
    StudentsdragdropPage.prototype.goBack = function () {
        if (this.fromWhere == 'exam') {
            this.router.navigate(['members', 'studentexamquestionslist']);
        }
        else if (this.fromWhere == 'homework') {
            this.router.navigate(['members', 'studenthomeworkquestionslist']);
        }
    };
    StudentsdragdropPage.prototype.goNext = function () {
        var _this = this;
        // get the result of first Choice
        if (this.q1.length > 0) {
            this.dragOne = this.q1[0].value;
            for (var i = 1; i < this.q1.length; i++) {
                var element = this.q1[i].value;
                this.dragOne = this.dragOne + "," + element;
            }
            console.log('the DragOne Result: ' + this.dragOne);
        }
        // get the result of second Choice
        if (this.q2.length > 0) {
            this.dragTwo = this.q2[0].value;
            for (var i = 1; i < this.q2.length; i++) {
                var element = this.q2[i].value;
                this.dragTwo = this.dragTwo + "," + element;
            }
            console.log('the DragTwo Result: ' + this.dragTwo);
        }
        // get the result of three Choice
        if (this.q3.length > 0) {
            this.dragThree = this.q3[0].value;
            for (var i = 1; i < this.q3.length; i++) {
                var element = this.q3[i].value;
                this.dragThree = this.dragThree + "," + element;
            }
            console.log("the DragThree Result: " + this.dragThree);
        }
        // record the result
        this.network.recordStudentDragDropAnswer(this.stExamID, this.stID, this.QID, this.dragOne, this.dragTwo, this.dragThree, this.fromWhere).then(function (result) {
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
    StudentsdragdropPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentsdragdrop',
            templateUrl: './studentsdragdrop.page.html',
            styleUrls: ['./studentsdragdrop.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, DragulaService, ToastController, PopoverController])
    ], StudentsdragdropPage);
    return StudentsdragdropPage;
}());
export { StudentsdragdropPage };
//# sourceMappingURL=studentsdragdrop.page.js.map