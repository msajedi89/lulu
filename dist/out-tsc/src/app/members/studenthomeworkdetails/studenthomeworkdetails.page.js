import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var STUDENTHOMEID = 'homeid';
var LANGUAGE = 'language';
var StudenthomeworkdetailsPage = /** @class */ (function () {
    function StudenthomeworkdetailsPage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.homework = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    StudenthomeworkdetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(STUDENTHOMEID).then(function (homeID) {
            // get the student's Homeworks List
            _this.network.getHomeworkListByID(homeID).then(function (homeworkData) {
                var jsonArray = homeworkData;
                _this.homework = jsonArray[0];
                console.log('I received homeworkList: ' + JSON.stringify(_this.homework));
            });
        });
    };
    StudenthomeworkdetailsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'studenthomeworks']);
    };
    StudenthomeworkdetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-studenthomeworkdetails',
            templateUrl: './studenthomeworkdetails.page.html',
            styleUrls: ['./studenthomeworkdetails.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], StudenthomeworkdetailsPage);
    return StudenthomeworkdetailsPage;
}());
export { StudenthomeworkdetailsPage };
//# sourceMappingURL=studenthomeworkdetails.page.js.map