import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTEXAMID = 'examid';
var LANGUAGE = 'language';
var ListofstudentexamsPage = /** @class */ (function () {
    function ListofstudentexamsPage(storage, router, platform, network, navCtrl) {
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
    ListofstudentexamsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Exams List
            _this.network.getExamsList(_this.studentID).then(function (examData) {
                _this.examList = examData;
                console.log('I received Exams: ' + JSON.stringify(_this.examList));
                if (_this.examList == '0 result') {
                    alert('There is no New Exam for you!');
                }
            });
        });
    };
    ListofstudentexamsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    ListofstudentexamsPage.prototype.goToStudentExam = function (stExamID, hasCompleted) {
        var _this = this;
        this.network.updateStudentExam(stExamID, 1, 1, hasCompleted).then(function () {
            _this.storage.set(STUDENTEXAMID, stExamID).then(function (result) {
                console.log('the ExamID for next page: ' + result);
                _this.router.navigate(['members', 'studentexamquestionslist']);
            });
        });
    };
    ListofstudentexamsPage = tslib_1.__decorate([
        Component({
            selector: 'app-listofstudentexams',
            templateUrl: './listofstudentexams.page.html',
            styleUrls: ['./listofstudentexams.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], ListofstudentexamsPage);
    return ListofstudentexamsPage;
}());
export { ListofstudentexamsPage };
//# sourceMappingURL=listofstudentexams.page.js.map