import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var MAINTITLE = 'maintitle';
var FORADDOREDIT = 'addoreditmaintitle';
var ManagemaintitlePage = /** @class */ (function () {
    function ManagemaintitlePage(router, platform, network, navCtrl, storage) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.mainTitles = '';
        this.mySearch = '';
    }
    ManagemaintitlePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Main Titles
            _this.network.getAllMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        });
    };
    ManagemaintitlePage.prototype.goBack = function () {
        this.router.navigate(['members', 'managetitles']);
    };
    // Filter Maintitles
    ManagemaintitlePage.prototype.updateMainTitles = function () {
        var _this = this;
        if (this.mySearch != '') {
            console.log('my Search: ' + this.mySearch);
            this.network.filterMainTitles(this.mySearch).then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        }
        else {
            this.network.getAllMainTitles().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.mainTitles = data;
            });
        }
    };
    ManagemaintitlePage.prototype.goForEditing = function (mtID) {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'edit').then(function () {
            _this.storage.set(MAINTITLE, mtID).then(function (result) {
                console.log('the result of mtID in storage: ' + result);
                _this.router.navigate(['members', 'editmaintitle']);
            });
        });
    };
    ManagemaintitlePage.prototype.goToAddMainTitle = function () {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'add').then(function () {
            _this.router.navigate(['members', 'editmaintitle']);
        });
    };
    ManagemaintitlePage = tslib_1.__decorate([
        Component({
            selector: 'app-managemaintitle',
            templateUrl: './managemaintitle.page.html',
            styleUrls: ['./managemaintitle.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], ManagemaintitlePage);
    return ManagemaintitlePage;
}());
export { ManagemaintitlePage };
//# sourceMappingURL=managemaintitle.page.js.map