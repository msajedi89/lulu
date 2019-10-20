import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var LANGUAGE = 'language';
var ReportexamprogressPage = /** @class */ (function () {
    function ReportexamprogressPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.studentID = '';
        this.examsList = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    ReportexamprogressPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Homeworks List
            _this.network.reportStudentExamProgress(_this.studentID).then(function (examsData) {
                _this.examsList = examsData;
                console.log('I received Exams: ' + JSON.stringify(_this.examsList));
                if (_this.examsList == '0 result') {
                    console.log('There is no exam!');
                }
            });
        });
    };
    ReportexamprogressPage.prototype.goBack = function () {
        this.router.navigate(['members', 'studentreports']);
    };
    ReportexamprogressPage.prototype.goToExamQuestions = function (stExamID) {
        var _this = this;
        this.storage.set(STUDENTEXAMID, stExamID).then(function () {
            _this.router.navigate(['members', 'studenttakenexamquestionlist']);
        });
    };
    ReportexamprogressPage = tslib_1.__decorate([
        Component({
            selector: 'app-reportexamprogress',
            templateUrl: './reportexamprogress.page.html',
            styleUrls: ['./reportexamprogress.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], ReportexamprogressPage);
    return ReportexamprogressPage;
}());
export { ReportexamprogressPage };
//# sourceMappingURL=reportexamprogress.page.js.map