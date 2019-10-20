import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var LANGUAGE = 'language';
var ListofstudentstakenexamPage = /** @class */ (function () {
    function ListofstudentstakenexamPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.studentID = '';
        this.examList = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    ListofstudentstakenexamPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Exams List
            _this.network.getStudentTakenExamsList(_this.studentID).then(function (examData) {
                _this.examList = examData;
                console.log('I received Exams: ' + JSON.stringify(_this.examList));
            });
        });
    };
    ListofstudentstakenexamPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    ListofstudentstakenexamPage.prototype.goToStudentExam = function (stExamID) {
        var _this = this;
        this.storage.set(STUDENTEXAMID, stExamID).then(function (result) {
            console.log('the stExamID for next page: ' + result);
            _this.router.navigate(['members', 'studenttakenexamquestionlist']);
        });
    };
    ListofstudentstakenexamPage = tslib_1.__decorate([
        Component({
            selector: 'app-listofstudentstakenexam',
            templateUrl: './listofstudentstakenexam.page.html',
            styleUrls: ['./listofstudentstakenexam.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], ListofstudentstakenexamPage);
    return ListofstudentstakenexamPage;
}());
export { ListofstudentstakenexamPage };
//# sourceMappingURL=listofstudentstakenexam.page.js.map