import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../network-engine.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(router, platform, network, navCtrl, toastController) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.toastController = toastController;
        this.parent = '';
        this.responseTxt = '';
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.goBack = function () {
        this.router.navigate(['home']);
    };
    // show a Toast.
    RegisterPage.prototype.presentToast = function (text) {
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
    RegisterPage.prototype.register = function (nameFamily, username, password, address, phone) {
        var _this = this;
        if (address == null) {
            address = '';
        }
        if (phone == null) {
            phone = '';
        }
        if ((nameFamily != null) && (username != null) && (password != null)) {
            this.responseTxt = '';
            this.network.getParentByUsername(username).then(function (parentData) {
                var jsonArray = parentData;
                _this.parent = jsonArray[0];
                console.log('I Received parent: ' + JSON.stringify(_this.parent));
                // check the Dublication of username
                if (_this.parent == '0') {
                    _this.network.addOrEditParent(1, nameFamily, username, password, address, phone, 1, 'add').then(function (result) {
                        _this.responseTxt = '';
                        _this.presentToast('You signed up successfully...');
                        console.log(JSON.stringify(result));
                    }).catch(function (error) {
                        alert(error);
                    });
                }
                else {
                    _this.responseTxt = 'This Username has registered before!';
                }
            });
        }
        else {
            this.responseTxt = 'Please fill the required fields!';
        }
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map