import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var MAINTITLE = 'maintitleid';
var LANGUAGE = 'language';
var LecternmaintitlepagePage = /** @class */ (function () {
    function LecternmaintitlepagePage(storage, router, platform, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.mainTitles = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    LecternmaintitlepagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.network.getMainTitles().then(function (maintitlesData) {
                _this.mainTitles = maintitlesData;
                console.log('the mainTitles: ' + JSON.stringify(_this.mainTitles));
            });
        });
    };
    LecternmaintitlepagePage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    LecternmaintitlepagePage.prototype.goToMainTitle = function (mtID) {
        var _this = this;
        this.storage.set(MAINTITLE, mtID).then(function () {
            console.log('the mtID is: ' + mtID);
            _this.router.navigate(['members', 'lecternsubtitlepage']);
        });
    };
    LecternmaintitlepagePage = tslib_1.__decorate([
        Component({
            selector: 'app-lecternmaintitlepage',
            templateUrl: './lecternmaintitlepage.page.html',
            styleUrls: ['./lecternmaintitlepage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, Platform, NetworkEngineService,
            NavController])
    ], LecternmaintitlepagePage);
    return LecternmaintitlepagePage;
}());
export { LecternmaintitlepagePage };
//# sourceMappingURL=lecternmaintitlepage.page.js.map