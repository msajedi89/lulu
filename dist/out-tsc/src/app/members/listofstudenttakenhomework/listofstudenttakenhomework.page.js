import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var USERID = 'userid';
var STUDENTHOMEWORKID = 'homeworkid';
var LANGUAGE = 'language';
var ListofstudenttakenhomeworkPage = /** @class */ (function () {
    function ListofstudenttakenhomeworkPage(storage, router, platform, network, navCtrl) {
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
    ListofstudenttakenhomeworkPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            // get the student's Homeworks List
            _this.network.getStudentTakenHomeworksList(_this.studentID).then(function (homeworkData) {
                _this.homeworkList = homeworkData;
                console.log('I received Exams: ' + JSON.stringify(_this.homeworkList));
            });
        });
    };
    ListofstudenttakenhomeworkPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    ListofstudenttakenhomeworkPage.prototype.goToStudentHomework = function (hwkID) {
        var _this = this;
        this.storage.set(STUDENTHOMEWORKID, hwkID).then(function (result) {
            console.log('the hwkID for next page: ' + result);
            _this.router.navigate(['members', 'studenttakenhomeworkquestionlist']);
        });
    };
    ListofstudenttakenhomeworkPage = tslib_1.__decorate([
        Component({
            selector: 'app-listofstudenttakenhomework',
            templateUrl: './listofstudenttakenhomework.page.html',
            styleUrls: ['./listofstudenttakenhomework.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], ListofstudenttakenhomeworkPage);
    return ListofstudenttakenhomeworkPage;
}());
export { ListofstudenttakenhomeworkPage };
//# sourceMappingURL=listofstudenttakenhomework.page.js.map