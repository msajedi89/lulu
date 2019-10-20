import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var SUBTITLE = 'subtitle';
var FORADDOREDIT = 'addoreditsubtitle';
var ManagesubtitlePage = /** @class */ (function () {
    function ManagesubtitlePage(router, platform, network, navCtrl, storage) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.subTitles = '';
        this.mySearch = '';
    }
    ManagesubtitlePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Sub Titles
            _this.network.getAllSubTitles().then(function (data) {
                console.log('I recieved Sub Titles: ' + JSON.stringify(data));
                _this.subTitles = data;
            });
        });
    };
    ManagesubtitlePage.prototype.goBack = function () {
        this.router.navigate(['members', 'managetitles']);
    };
    // Filter Maintitles
    ManagesubtitlePage.prototype.updateSubTitles = function () {
        var _this = this;
        if (this.mySearch != '') {
            console.log('my Search: ' + this.mySearch);
            this.network.filterSubTitles(this.mySearch).then(function (data) {
                console.log('I recieved sub Titles: ' + JSON.stringify(data));
                _this.subTitles = data;
            });
        }
        else {
            this.network.getAllSubTitles().then(function (data) {
                console.log('I recieved sub Titles: ' + JSON.stringify(data));
                _this.subTitles = data;
            });
        }
    };
    ManagesubtitlePage.prototype.goForEditing = function (SubTID) {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'edit').then(function () {
            _this.storage.set(SUBTITLE, SubTID).then(function (result) {
                console.log('the result of SubTID in storage: ' + result);
                _this.router.navigate(['members', 'editsubtitle']);
            });
        });
    };
    ManagesubtitlePage.prototype.goToAddSubTitle = function () {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'add').then(function () {
            _this.router.navigate(['members', 'editsubtitle']);
        });
    };
    ManagesubtitlePage = tslib_1.__decorate([
        Component({
            selector: 'app-managesubtitle',
            templateUrl: './managesubtitle.page.html',
            styleUrls: ['./managesubtitle.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], ManagesubtitlePage);
    return ManagesubtitlePage;
}());
export { ManagesubtitlePage };
//# sourceMappingURL=managesubtitle.page.js.map