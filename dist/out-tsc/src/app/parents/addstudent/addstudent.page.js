import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Storage } from '@ionic/storage';
import { Platform, NavController, ToastController, ActionSheetController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
var LANGUAGE = 'language';
var AddstudentPage = /** @class */ (function () {
    function AddstudentPage(router, platform, network, navCtrl, storage, toastController, actionSheetController, camera, transfer) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.transfer = transfer;
        this.language = '';
        this.profileImg = '../../../assets/imgs/default-user.jpg';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    AddstudentPage.prototype.ngOnInit = function () {
    };
    AddstudentPage.prototype.goBack = function () {
        this.router.navigate(['parentdash']);
    };
    // show a Toast.
    AddstudentPage.prototype.presentToast = function (text) {
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
    AddstudentPage = tslib_1.__decorate([
        Component({
            selector: 'app-addstudent',
            templateUrl: './addstudent.page.html',
            styleUrls: ['./addstudent.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage, ToastController, ActionSheetController,
            Camera, FileTransfer])
    ], AddstudentPage);
    return AddstudentPage;
}());
export { AddstudentPage };
//# sourceMappingURL=addstudent.page.js.map