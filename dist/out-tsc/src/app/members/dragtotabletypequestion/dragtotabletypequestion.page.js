import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActionSheetController, ToastController, Platform, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../../network-engine.service';
var DragtotabletypequestionPage = /** @class */ (function () {
    function DragtotabletypequestionPage(router, platform, network, toastController, actionSheetController, navCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.navCtrl = navCtrl;
        this.mainTitle = null;
        this.subTitle = null;
        // required variables for inserting Question
        this.myQuestionVoiceID = 1;
        this.myQuestionImgID = 1;
    }
    DragtotabletypequestionPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get Main Titles
            _this.network.getMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        });
    };
    DragtotabletypequestionPage.prototype.goBack = function () {
        this.router.navigate(['members', 'questions']);
    };
    // ***************** Main Title Select *****************
    DragtotabletypequestionPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    DragtotabletypequestionPage.prototype.onClose = function () {
        var _this = this;
        // get the Sub Title of Chosen Main Title
        this.network.getSubTitles(this.mainTitle.mtID).then(function (data) {
            console.log('I recieved Sub Title: ' + JSON.stringify(data));
            _this.subTitles = data;
        });
    };
    // show a Toast.
    DragtotabletypequestionPage.prototype.presentToast = function (text) {
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
    DragtotabletypequestionPage.prototype.showData = function (data) {
        var jsonArray = data;
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var obj = jsonArray_1[_i];
            for (var key in obj) {
                this.returnValue = obj[key];
            }
        }
        return this.returnValue;
    };
    DragtotabletypequestionPage.prototype.insertQuestion = function (name, question, questionAr, questionAz, maxTime, descriptionEn, descriptionAr) {
        var _this = this;
        if (questionAr == null) {
            questionAr = "";
        }
        if (questionAz == null) {
            questionAz = "";
        }
        if (maxTime == null) {
            maxTime = 0;
        }
        if (descriptionEn == null) {
            descriptionEn = "";
        }
        if (descriptionAr == null) {
            descriptionAr = "";
        }
        // ****** insert Question ******
        if ((name != null) && (question != null) && (this.mainTitle != null) && (this.subTitle != null)) {
            this.network.insertQuestion(name, this.mainTitle.mtID, this.subTitle.SubTID, maxTime, question, questionAr, questionAz, this.myQuestionVoiceID, this.myQuestionImgID, descriptionEn, descriptionAr, 3).then(function (data) {
                _this.myQuestionID = _this.showData(data);
                console.log('The inserted Question ID is: ' + _this.myQuestionID);
                _this.presentToast('The Question has been inserted. with the QuestionID: ' + _this.myQuestionID);
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the Required fields');
        }
    };
    // Insert Question Answer
    DragtotabletypequestionPage.prototype.insertQuestionAnswer = function (tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz, text1, text2, text3, text4, text5, text6) {
        var _this = this;
        if (text3 == null) {
            text3 = "";
        }
        if (text6 == null) {
            text6 = "";
        }
        if (tblOneAz == null) {
            tblOneAz = "";
        }
        if (tblTwoAz == null) {
            tblTwoAz = "";
        }
        if (tblOneAr == null) {
            tblOneAr = "";
        }
        if (tblTwoAr == null) {
            tblTwoAr = "";
        }
        if (tblOneEn == null) {
            tblOneEn = "";
        }
        if (tblTwoEn == null) {
            tblTwoEn = "";
        }
        if ((text1 != null) && (text2 != null) && (text4 != null) && (text5 != null)) {
            // insert Question Answer to tbl_SelectionAnswersType
            var tblOneTexts = text1 + ',' + text2 + ',' + text3;
            var tblTwoTexts = text4 + ',' + text5 + ',' + text6;
            var myAnswerID_1;
            this.network.insertDragToTableAnswersType(this.myQuestionID, tblOneEn, tblOneAr, tblOneAz, tblTwoEn, tblTwoAr, tblTwoAz, tblOneTexts, tblTwoTexts).then(function (data) {
                myAnswerID_1 = _this.showData(data);
                _this.presentToast('The Question has been inserted. with the QuestionID: ' + _this.myQuestionID + ' and AnswerID: ' + myAnswerID_1);
                console.log('The insertedDragDropAnswer ID is: ' + myAnswerID_1);
            }, function (err) {
                alert(err);
            });
        }
    };
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], DragtotabletypequestionPage.prototype, "selectComponent", void 0);
    DragtotabletypequestionPage = tslib_1.__decorate([
        Component({
            selector: 'app-dragtotabletypequestion',
            templateUrl: './dragtotabletypequestion.page.html',
            styleUrls: ['./dragtotabletypequestion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, NavController])
    ], DragtotabletypequestionPage);
    return DragtotabletypequestionPage;
}());
export { DragtotabletypequestionPage };
//# sourceMappingURL=dragtotabletypequestion.page.js.map