import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var MAINTITLE = 'maintitleid';
var SUBTITLE = 'subtitleid';
var LANGUAGE = 'language';
var LecternsubtitlepagePage = /** @class */ (function () {
    function LecternsubtitlepagePage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.subTitles = '';
        this.mainTitle = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    LecternsubtitlepagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(MAINTITLE).then(function (mtID) {
            // get Chosen Main Title by its ID
            _this.network.getMainTitleByID(mtID).then(function (maintitleData) {
                var jsonArray = maintitleData;
                _this.mainTitle = jsonArray[0];
                console.log('the maintitle is: ' + JSON.stringify(_this.mainTitle));
            });
            // get Sub Title
            _this.network.getSubTitles(mtID).then(function (subTitleData) {
                _this.subTitles = subTitleData;
                console.log('the subTitles: ' + JSON.stringify(_this.subTitles));
            });
        });
    };
    LecternsubtitlepagePage.prototype.goBack = function () {
        this.router.navigate(['members', 'lecternmaintitlepage']);
    };
    LecternsubtitlepagePage.prototype.goToSubTitle = function (subTID) {
        var _this = this;
        this.storage.set(SUBTITLE, subTID).then(function () {
            console.log('the subTID for Next Page: ' + subTID);
            _this.router.navigate(['members', 'lecternquestionspage']);
        });
    };
    LecternsubtitlepagePage = tslib_1.__decorate([
        Component({
            selector: 'app-lecternsubtitlepage',
            templateUrl: './lecternsubtitlepage.page.html',
            styleUrls: ['./lecternsubtitlepage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], LecternsubtitlepagePage);
    return LecternsubtitlepagePage;
}());
export { LecternsubtitlepagePage };
//# sourceMappingURL=lecternsubtitlepage.page.js.map