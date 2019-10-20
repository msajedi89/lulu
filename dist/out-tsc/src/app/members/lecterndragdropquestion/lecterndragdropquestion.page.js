import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/popover/popover.component';
var LECTERNQUESTIONID = 'lecternqid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var LecterndragdropquestionPage = /** @class */ (function () {
    function LecterndragdropquestionPage(router, platform, network, navCtrl, storage, dragulaService, toastCtrl, popoverCtrl) {
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
        // the Description variables for pop up
        this.descriptionEn = '';
        this.descriptionAr = '';
        // ***** the variables for Evaluation *****
        this.studentAnswer = '';
        // the variables for showing student results along with Evaluation
        this.q1Real = [];
        this.q2Real = [];
        this.q3Real = [];
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
    LecterndragdropquestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(LECTERNQUESTIONID).then(function (resultQID) {
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
                    _this.q1Real.push(_this.answer.LeftOneEn);
                }
                if (_this.answer.LeftOneAr != null) {
                    _this.q4.push({ value: _this.answer.LeftOneAr, color: 'secondary' });
                    _this.q1Real.push(_this.answer.LeftOneAr);
                }
                if (_this.answer.LeftOneAz != null) {
                    _this.q4.push({ value: _this.answer.LeftOneAz, color: 'secondary' });
                    _this.q1Real.push(_this.answer.LeftOneAz);
                }
                if (_this.answer.LeftTwoEn != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoEn, color: 'secondary' });
                    _this.q2Real.push(_this.answer.LeftTwoEn);
                }
                if (_this.answer.LeftTwoAr != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoAr, color: 'secondary' });
                    _this.q2Real.push(_this.answer.LeftTwoAr);
                }
                if (_this.answer.LeftTwoAz != null) {
                    _this.q4.push({ value: _this.answer.LeftTwoAz, color: 'secondary' });
                    _this.q2Real.push(_this.answer.LeftTwoAz);
                }
                if (_this.answer.LeftThreeEn != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeEn, color: 'secondary' });
                    _this.q3Real.push(_this.answer.LeftThreeEn);
                }
                if (_this.answer.LeftThreeAr != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeAr, color: 'secondary' });
                    _this.q3Real.push(_this.answer.LeftThreeAr);
                }
                if (_this.answer.LeftThreeAz != null) {
                    _this.q4.push({ value: _this.answer.LeftThreeAz, color: 'secondary' });
                    _this.q3Real.push(_this.answer.LeftThreeAz);
                }
                console.log('the q1Real is: ' + _this.q1Real);
                console.log('the q2Real is: ' + _this.q2Real);
                console.log('the q3Real is: ' + _this.q3Real);
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
    LecterndragdropquestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternquestionspage']);
    };
    // play the Question Voice
    LecterndragdropquestionPage.prototype.playVoice = function () {
        this.questionVoice.play();
    };
    LecterndragdropquestionPage.prototype.randomizeAnswers = function (collection) {
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
    LecterndragdropquestionPage.prototype.presentPopover = function (ev) {
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
    LecterndragdropquestionPage.prototype.evaluateStudentAnswer = function () {
        // get the result of first Choice
        if (this.q1.length > 0) {
            this.dragOne = this.q1[0].value;
            for (var i = 1; i < this.q1.length; i++) {
                var element = this.q1[i].value;
                this.dragOne = this.dragOne + ',' + element;
            }
            console.log('the DragOne Result: ' + this.dragOne);
        }
        // get the result of second Choice
        if (this.q2.length > 0) {
            this.dragTwo = this.q2[0].value;
            for (var i = 1; i < this.q2.length; i++) {
                var element = this.q2[i].value;
                this.dragTwo = this.dragTwo + ',' + element;
            }
            console.log('the DragTwo Result: ' + this.dragTwo);
        }
        // get the result of three Choice
        if (this.q3.length > 0) {
            this.dragThree = this.q3[0].value;
            for (var i = 1; i < this.q3.length; i++) {
                var element = this.q3[i].value;
                this.dragThree = this.dragThree + ',' + element;
            }
            console.log('the DragThree Result: ' + this.dragThree);
        }
        this.q1 = [];
        this.q2 = [];
        this.q3 = [];
        // Evaluate First Choice of Student
        var found = false;
        var x = this.dragOne;
        var fstStAnswer = x.split(',');
        console.log('the fstStAnswer is: ' + fstStAnswer);
        if (fstStAnswer.length > 0) {
            for (var i = 0; i < fstStAnswer.length; i++) {
                var textX = fstStAnswer[i];
                found = false;
                for (var j = 0; j < this.q1Real.length; j++) {
                    if (textX == this.q1Real[j]) {
                        found = true;
                    }
                }
                if (found == true) {
                    this.q1.push({ value: textX, color: '#00fa00' });
                }
                else {
                    this.q1.push({ value: textX, color: '#F3534B' });
                }
            }
        }
        // Evaluate the Second Choice of Student
        var y = this.dragTwo;
        var secStAnswer = y.split(',');
        console.log('the secStAnswer is: ' + secStAnswer);
        if (secStAnswer.length > 0) {
            for (var i = 0; i < secStAnswer.length; i++) {
                var textX = secStAnswer[i];
                found = false;
                for (var j = 0; j < this.q2Real.length; j++) {
                    if (textX == this.q2Real[j]) {
                        found = true;
                    }
                }
                if (found == true) {
                    this.q2.push({ value: textX, color: '#00fa00' });
                }
                else {
                    this.q2.push({ value: textX, color: '#F3534B' });
                }
            }
        }
        // Evaluate the Third Choice of Student
        var z = this.dragThree;
        var trdStAnswer = z.split(',');
        console.log('the trdStAnswer is: ' + trdStAnswer);
        if (trdStAnswer.length > 0) {
            for (var i = 0; i < trdStAnswer.length; i++) {
                var textX = trdStAnswer[i];
                found = false;
                for (var j = 0; j < this.q3Real.length; j++) {
                    if (textX == this.q3Real[j]) {
                        found = true;
                    }
                }
                if (found == true) {
                    this.q3.push({ value: textX, color: '#00fa00' });
                }
                else {
                    this.q3.push({ value: textX, color: '#F3534B' });
                }
            }
        }
    };
    LecterndragdropquestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-lecterndragdropquestion',
            templateUrl: './lecterndragdropquestion.page.html',
            styleUrls: ['./lecterndragdropquestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, DragulaService, ToastController, PopoverController])
    ], LecterndragdropquestionPage);
    return LecterndragdropquestionPage;
}());
export { LecterndragdropquestionPage };
//# sourceMappingURL=lecterndragdropquestion.page.js.map