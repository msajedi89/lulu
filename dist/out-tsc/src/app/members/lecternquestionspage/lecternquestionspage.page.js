import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var MAINTITLE = 'maintitleid';
var SUBTITLE = 'subtitleid';
var LECTERNQUESTIONID = 'lecternqid';
var LANGUAGE = 'language';
var LecternquestionspagePage = /** @class */ (function () {
    function LecternquestionspagePage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.mainTitle = '';
        this.subTitle = '';
        this.questionsList = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    LecternquestionspagePage.prototype.ngOnInit = function () {
        var _this = this;
        // get Chosen mtID
        this.storage.get(MAINTITLE).then(function (mtID) {
            // get Chosen subTID
            _this.storage.get(SUBTITLE).then(function (subTID) {
                // get Chosen Main Title by its ID
                _this.network.getMainTitleByID(mtID).then(function (maintitleData) {
                    var jsonArray = maintitleData;
                    _this.mainTitle = jsonArray[0];
                    console.log('the maintitle is: ' + JSON.stringify(_this.mainTitle));
                });
                // get Sub Title
                _this.network.getSubTitleByID(subTID).then(function (subTitleData) {
                    var jsonArray2 = subTitleData;
                    _this.subTitle = jsonArray2[0];
                    console.log('the subTitles: ' + JSON.stringify(_this.subTitle));
                });
                // get the Questions
                _this.network.get100QuestionsFilterByTitle(mtID, subTID).then(function (questionData) {
                    _this.questionsList = questionData;
                    console.log('the questionsList: ' + JSON.stringify(_this.questionsList));
                });
            });
        });
    };
    LecternquestionspagePage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternsubtitlepage']);
    };
    LecternquestionspagePage.prototype.goToQuestion = function (questionType, qID) {
        var _this = this;
        console.log('the questionType is: ' + questionType);
        this.storage.set(LECTERNQUESTIONID, qID).then(function () {
            switch (questionType) {
                case '1':
                    _this.router.navigate(['members', 'lecterndragdropquestion']);
                    break;
                case '2':
                    _this.router.navigate(['members', 'lecternselectivequestion']);
                    break;
                case '3':
                    _this.router.navigate(['members', 'lecterndragtablequestion']);
                    break;
                case '4':
                    _this.router.navigate(['members', 'lecterndescriptivequestion']);
                    break;
                case '5':
                    _this.router.navigate(['members', 'lecterndrawingquestion']);
                    break;
                case '6':
                    _this.router.navigate(['members', 'lecternrecitequranquestion']);
                    break;
                default:
                    break;
            }
        });
    };
    LecternquestionspagePage = tslib_1.__decorate([
        Component({
            selector: 'app-lecternquestionspage',
            templateUrl: './lecternquestionspage.page.html',
            styleUrls: ['./lecternquestionspage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], LecternquestionspagePage);
    return LecternquestionspagePage;
}());
export { LecternquestionspagePage };
//# sourceMappingURL=lecternquestionspage.page.js.map