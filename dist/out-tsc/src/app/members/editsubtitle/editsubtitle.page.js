import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonicSelectableComponent } from 'ionic-selectable';
var SUBTITLE = 'subtitle';
var FORADDOREDIT = 'addoreditsubtitle';
var EditsubtitlePage = /** @class */ (function () {
    function EditsubtitlePage(router, platform, network, navCtrl, storage, toastController) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.subTitleData = '';
        this.subTitle = '';
        this.subTitleOf = '';
        this.subTitleOfID = '';
        this.subTID = '';
        this.stStatus = false;
        this.forAddOrEdit = '';
        this.mainTitle = null;
    }
    EditsubtitlePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the main titles for selection
            _this.network.getAllMainTitles().then(function (mainTitlesData) {
                _this.mainTitles = mainTitlesData;
                console.log('I recieved Main Titles: ' + JSON.stringify(_this.mainTitles));
            });
            _this.storage.get(FORADDOREDIT).then(function (forAddOrEditResult) {
                _this.forAddOrEdit = forAddOrEditResult;
                if (_this.forAddOrEdit == 'edit') {
                    _this.storage.get(SUBTITLE).then(function (subTID) {
                        _this.subTID = subTID;
                        // get the Main Title By mtID
                        _this.network.getSubTitleByIDForManaging(subTID).then(function (data) {
                            var jsonArray = data;
                            _this.subTitleData = jsonArray[0];
                            _this.subTitle = _this.subTitleData.SubTitle;
                            _this.subTitleOf = _this.subTitleData.MainTitle;
                            _this.subTitleOfID = _this.subTitleData.SubTitleOf;
                            _this.stStatus = false;
                            if (_this.subTitleData.Status == '0') {
                                _this.stStatus = false;
                            }
                            else {
                                _this.stStatus = true;
                            }
                            console.log('the subTitleData is: ' + JSON.stringify(_this.subTitleData));
                        });
                    });
                }
            });
        });
    };
    EditsubtitlePage.prototype.goBack = function () {
        this.router.navigate(['members', 'managesubtitle']);
    };
    EditsubtitlePage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.mainTitle);
    };
    // when select component has been closed.
    EditsubtitlePage.prototype.onClose = function () {
        this.subTitleOf = this.mainTitle.MainTitle;
        this.subTitleOfID = this.mainTitle.mtID;
    };
    // show a Toast.
    EditsubtitlePage.prototype.presentToast = function (text) {
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
    EditsubtitlePage.prototype.saveChanges = function (newSubTitle) {
        var _this = this;
        if ((newSubTitle != null) && (this.subTitleOfID != '')) {
            this.network.addOrEditSubTitle(this.subTID, newSubTitle, this.subTitleOfID, this.stStatus, this.forAddOrEdit).then(function (result) {
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
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], EditsubtitlePage.prototype, "selectComponent", void 0);
    EditsubtitlePage = tslib_1.__decorate([
        Component({
            selector: 'app-editsubtitle',
            templateUrl: './editsubtitle.page.html',
            styleUrls: ['./editsubtitle.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController])
    ], EditsubtitlePage);
    return EditsubtitlePage;
}());
export { EditsubtitlePage };
//# sourceMappingURL=editsubtitle.page.js.map