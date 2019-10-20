import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform, NavController } from '@ionic/angular';
import { NetworkEngineService } from '../network-engine.service';
var TOKEN_KEY = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storage, plt, network, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.network = network;
        this.navCtrl = navCtrl;
        this.authenticationState = new BehaviorSubject(false);
        this.isTeacher = new BehaviorSubject(false);
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    AuthenticationService.prototype.login = function (username, whoIs) {
        var _this = this;
        if (whoIs == "teacher") {
            this.isTeacher.next(true);
            console.log("who is in AuthenticationService:" + whoIs);
            console.log("who is in AuthenticationService:" + this.isTeacher.getValue());
        }
        if (whoIs == "student") {
            this.isTeacher.next(false);
            console.log("who is in AuthenticationService:" + whoIs);
            console.log("who is in AuthenticationService:" + this.isTeacher.getValue());
        }
        this.storage.set('whois', whoIs);
        return this.storage.set(TOKEN_KEY, username).then(function (result) {
            _this.authenticationState.next(true);
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.checkToken = function () {
        var _this = this;
        return this.storage.get(TOKEN_KEY).then(function (result) {
            _this.storage.get('whois').then(function (val) {
                console.log("who is:" + val);
                if (val == "teacher") {
                    _this.isTeacher.next(true);
                    console.log("state of isTeacher:" + _this.isTeacher.getValue());
                }
                if (val == "student") {
                    _this.isTeacher.next(false);
                    console.log("state of isTeacher:" + _this.isTeacher.getValue());
                }
            });
            if (result) {
                _this.authenticationState.next(true);
            }
        });
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Platform, NetworkEngineService,
            NavController])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map