import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTHOMEID = 'homeid';
var LANGUAGE = 'language';
var StudenthomeworksPage = /** @class */ (function () {
    function StudenthomeworksPage(storage, router, platform, network, navCtrl) {
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
    StudenthomeworksPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Homeworks List
            _this.network.getStudentHomeworks(_this.studentID).then(function (homeworkData) {
                _this.homeworkList = homeworkData;
                console.log('I received homeworkList: ' + JSON.stringify(_this.homeworkList));
            });
        });
    };
    StudenthomeworksPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    StudenthomeworksPage.prototype.showDetails = function (homeID, hasSeen) {
        var _this = this;
        if (hasSeen == false) {
            this.network.updateHasSeenHomework(homeID).then(function (resultData) {
                console.log('the result of Updating: ' + JSON.stringify(resultData));
                _this.storage.set(STUDENTHOMEID, homeID).then(function (result) {
                    console.log('the homeID for next page: ' + result);
                    _this.router.navigate(['members', 'studenthomeworkdetails']);
                });
            });
        }
        else {
            this.storage.set(STUDENTHOMEID, homeID).then(function (result) {
                console.log('the homeID for next page: ' + result);
                _this.router.navigate(['members', 'studenthomeworkdetails']);
            });
        }
    };
    StudenthomeworksPage = tslib_1.__decorate([
        Component({
            selector: 'app-studenthomeworks',
            templateUrl: './studenthomeworks.page.html',
            styleUrls: ['./studenthomeworks.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudenthomeworksPage);
    return StudenthomeworksPage;
}());
export { StudenthomeworksPage };
//# sourceMappingURL=studenthomeworks.page.js.map