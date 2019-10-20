import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var MAINTITLE = 'maintitle';
var FORADDOREDIT = 'addoreditmaintitle';
var EditmaintitlePage = /** @class */ (function () {
    function EditmaintitlePage(router, platform, network, navCtrl, storage, toastController) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.mainTitleData = '';
        this.mainTitle = '';
        this.mtID = '';
        this.mtStatus = false;
        this.forAddOrEdit = '';
    }
    EditmaintitlePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.storage.get(FORADDOREDIT).then(function (forAddOrEditResult) {
                _this.forAddOrEdit = forAddOrEditResult;
                if (_this.forAddOrEdit == 'edit') {
                    _this.storage.get(MAINTITLE).then(function (mtID) {
                        _this.mtID = mtID;
                        // get the Main Title By mtID
                        _this.network.getMainTitleByID(mtID).then(function (data) {
                            var jsonArray = data;
                            _this.mainTitleData = jsonArray[0];
                            _this.mainTitle = _this.mainTitleData.MainTitle;
                            _this.mtStatus = false;
                            if (_this.mainTitleData.Status == '0') {
                                _this.mtStatus = false;
                            }
                            else {
                                _this.mtStatus = true;
                            }
                            console.log('the this.mainTitleData.Status is: ' + _this.mainTitleData.Status);
                            console.log('the mainTitleData is: ' + JSON.stringify(_this.mainTitleData));
                        });
                    });
                }
            });
        });
    };
    EditmaintitlePage.prototype.goBack = function () {
        this.router.navigate(['members', 'managemaintitle']);
    };
    // show a Toast.
    EditmaintitlePage.prototype.presentToast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
                            position: 'bottom',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditmaintitlePage.prototype.saveChanges = function (newMainTitle) {
        var _this = this;
        console.log('the mtStatus is: ' + this.mtStatus);
        if (newMainTitle != null) {
            this.network.addOrEditMainTitle(this.mtID, newMainTitle, this.mtStatus, this.forAddOrEdit).then(function (result) {
                _this.presentToast('Your data has been saved..');
                console.log('the result of saving is: ' + JSON.stringify(result));
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the required field');
        }
    };
    EditmaintitlePage = tslib_1.__decorate([
        Component({
            selector: 'app-editmaintitle',
            templateUrl: './editmaintitle.page.html',
            styleUrls: ['./editmaintitle.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EditmaintitlePage);
    return EditmaintitlePage;
}());
export { EditmaintitlePage };
//# sourceMappingURL=editmaintitle.page.js.map