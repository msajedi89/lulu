import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PopoverComponent } from 'src/app/popover/popover.component';
var LECTERNQUESTIONID = 'lecternqid';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var LecternselectivequestionPage = /** @class */ (function () {
    function LecternselectivequestionPage(router, platform, network, navCtrl, storage, popoverCtrl) {
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
        // the variables for Evaluating and Shownig the Correct Answers.
        this.oneColor = '#b9d6da';
        this.twoColor = '#b9d6da';
        this.threeColor = '#b9d6da';
        this.oneReal = false;
        this.twoReal = false;
        this.threeReal = false;
        this.stOne = false;
        this.stTwo = false;
        this.stThree = false;
        this.studentAnswer = '';
    }
    LecternselectivequestionPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Question ID
        this.storage.get(LECTERNQUESTIONID).then(function (resultQID) {
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
                _this.correctChoices = _this.answer.RightAnswers;
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
    LecternselectivequestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternquestionspage']);
    };
    LecternselectivequestionPage.prototype.presentPopover = function (ev) {
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
    // play the Question Voice
    LecternselectivequestionPage.prototype.playVoice = function (rootVoice) {
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
    // *********** when the Student click on Choices ************
    LecternselectivequestionPage.prototype.select = function (choice) {
        this.playVoice(choice);
        // *********** if the question is on Multi Selection ***********
        if (this.isMulti == true) {
            // change the color of First Choice on Click
            if (choice === 'fstChoice') {
                if (this.fstSelected === true) {
                    this.fstSelected = false;
                    this.oneColor = '#b9d6da';
                }
                else {
                    this.fstSelected = true;
                    this.oneColor = '#6BC357';
                }
            }
            // change the color of Second Choice on Click
            if (choice === 'secChoice') {
                if (this.secSelected === true) {
                    this.secSelected = false;
                    this.twoColor = '#b9d6da';
                }
                else {
                    this.secSelected = true;
                    this.twoColor = '#6BC357';
                }
            }
            // change the color of Third Choice on Click
            if (choice === 'trdChoice') {
                if (this.trdSelected === true) {
                    this.trdSelected = false;
                    this.threeColor = '#b9d6da';
                }
                else {
                    this.trdSelected = true;
                    this.threeColor = '#6BC357';
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
                    this.oneColor = '#6BC357';
                    this.twoColor = '#b9d6da';
                    this.threeColor = '#b9d6da';
                    break;
                case 'secChoice':
                    this.fstSelected = false;
                    this.secSelected = true;
                    this.trdSelected = false;
                    this.oneColor = '#b9d6da';
                    this.twoColor = '#6BC357';
                    this.threeColor = '#b9d6da';
                    break;
                case 'trdChoice':
                    this.fstSelected = false;
                    this.secSelected = false;
                    this.trdSelected = true;
                    this.oneColor = '#b9d6da';
                    this.twoColor = '#b9d6da';
                    this.threeColor = '#6BC357';
                    break;
                default:
                    break;
            }
        }
    };
    LecternselectivequestionPage.prototype.findx = function (x, collection) {
        var found = false;
        for (var i = 0; i < collection.length; i++) {
            if (x == collection[i]) {
                found = true;
            }
        }
        return found;
    };
    LecternselectivequestionPage.prototype.evaluateStudentAnswer = function () {
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
            var y = this.studentSelects;
            this.studentChoices = y.split(',');
            // ******* Determine the Correct Choices *******
            var isIn = false;
            // Check the First choice is Answer or not?
            isIn = this.findx(1, this.correctChoices);
            if (isIn == true) {
                this.oneReal = true;
                console.log('the oneReal is: ' + this.oneReal);
            }
            // Check the Second choice is Answer or not?
            isIn = this.findx(2, this.correctChoices);
            if (isIn == true) {
                this.twoReal = true;
                console.log('the twoReal is: ' + this.twoReal);
            }
            // Check the Third choice is Answer or not?
            isIn = this.findx(3, this.correctChoices);
            if (isIn == true) {
                this.threeReal = true;
                console.log('the threeReal is: ' + this.threeReal);
            }
            // ******* get the Students Choices *******
            // Check the Student Choose the First Choice or not?
            isIn = false;
            isIn = this.findx(1, this.studentChoices);
            if (isIn == true) {
                this.stOne = true;
                console.log('the stOne is: ' + this.stOne);
            }
            // Check the Student Choose the Second Choice or not?
            isIn = this.findx(2, this.studentChoices);
            if (isIn == true) {
                this.stTwo = true;
                console.log('the stTwo is: ' + this.stTwo);
            }
            // Check the Student Choose the Third Choice or not?
            isIn = this.findx(3, this.studentChoices);
            if (isIn == true) {
                this.stThree = true;
                console.log('the stThree is: ' + this.stThree);
            }
            // ******* Evaluation Process *******
            // evaluate the First Choice
            if (this.oneReal == true) {
                if (this.stOne == true) {
                    this.oneColor = '#00fa00';
                }
                else {
                    this.oneColor = 'yellow';
                }
            }
            else {
                if (this.stOne == true) {
                    this.oneColor = '#F3534B';
                }
                else {
                    this.oneColor = '#b9d6da';
                }
            }
            // evaluate the Second Choice
            if (this.twoReal == true) {
                if (this.stTwo == true) {
                    this.twoColor = '#00fa00';
                }
                else {
                    this.twoColor = 'yellow';
                }
            }
            else {
                if (this.stTwo == true) {
                    this.twoColor = '#F3534B';
                }
                else {
                    this.twoColor = '#b9d6da';
                }
            }
            // evaluate the Third Choice
            if (this.threeReal == true) {
                if (this.stThree == true) {
                    this.threeColor = '#00fa00';
                }
                else {
                    this.threeColor = 'yellow';
                }
            }
            else {
                if (this.stThree == true) {
                    this.threeColor = '#F3534B';
                }
                else {
                    this.threeColor = '#b9d6da';
                }
            }
        }
    };
    LecternselectivequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-lecternselectivequestion',
            templateUrl: './lecternselectivequestion.page.html',
            styleUrls: ['./lecternselectivequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, PopoverController])
    ], LecternselectivequestionPage);
    return LecternselectivequestionPage;
}());
export { LecternselectivequestionPage };
//# sourceMappingURL=lecternselectivequestion.page.js.map