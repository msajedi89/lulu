import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTHOMEWORKID = 'homeworkid';
var LANGUAGE = 'language';
var ListofstudenthomeworksPage = /** @class */ (function () {
    function ListofstudenthomeworksPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.studentID = '';
        this.homeworkList = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    ListofstudenthomeworksPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Homeworks List
            _this.network.getHomeworksList(_this.studentID).then(function (homeworkData) {
                _this.homeworkList = homeworkData;
                console.log('I received Exams: ' + JSON.stringify(_this.homeworkList));
                if (_this.homeworkList == '0 result') {
                    alert('There is no New Exercise for you!');
                }
            });
        });
    };
    ListofstudenthomeworksPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    ListofstudenthomeworksPage.prototype.goToStudentHomework = function (hwkID, hasCompleted) {
        var _this = this;
        this.network.updateStudentHomework(hwkID, 1, 1, hasCompleted).then(function () {
            _this.storage.set(STUDENTHOMEWORKID, hwkID).then(function (result) {
                console.log('the hwkID for next page: ' + result);
                _this.router.navigate(['members', 'studenthomeworkquestionslist']);
            });
        });
    };
    ListofstudenthomeworksPage = tslib_1.__decorate([
        Component({
            selector: 'app-listofstudenthomeworks',
            templateUrl: './listofstudenthomeworks.page.html',
            styleUrls: ['./listofstudenthomeworks.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], ListofstudenthomeworksPage);
    return ListofstudenthomeworksPage;
}());
export { ListofstudenthomeworksPage };
//# sourceMappingURL=listofstudenthomeworks.page.js.map