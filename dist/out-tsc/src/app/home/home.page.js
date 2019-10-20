import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../network-engine.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
var TEACHERID = 'teacherid';
var USERID = 'userid';
var WHOIS = 'whois';
var LANGUAGE = 'language';
var PARENT = 'parent';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, network, storage, authService, router, plt) {
        this.navCtrl = navCtrl;
        this.network = network;
        this.storage = storage;
        this.authService = authService;
        this.router = router;
        this.plt = plt;
        this.responseTxt = '';
        this.user = '';
        this.whoIs = 'student';
        this.language = 'english';
    }
    HomePage.prototype.segmentChanged = function (ev, value) {
        console.log('Segment changed', value);
    };
    HomePage.prototype.segment1ButtonClicked = function ($event) {
        this.language = 'english';
        console.log('language changed to: ' + this.language);
    };
    HomePage.prototype.segment2ButtonClicked = function ($event) {
        this.language = 'arabic';
        console.log('language changed to: ' + this.language);
    };
    HomePage.prototype.segmentChangedtoStudent = function ($event) {
        this.whoIs = 'student';
        console.log('the whoIs: ' + this.whoIs);
    };
    HomePage.prototype.segmentChangedtoParent = function ($event) {
        this.whoIs = 'parent';
        console.log('the whoIs: ' + this.whoIs);
    };
    HomePage.prototype.segmentChangedtoTeacher = function ($event) {
        this.whoIs = 'teacher';
        console.log('the whoIs: ' + this.whoIs);
    };
    HomePage.prototype.login = function (username, userpass) {
        var _this = this;
        this.storage.set(LANGUAGE, this.language);
        this.network.readTable(username, userpass, this.whoIs).then(function (data) {
            var jsonArray = data;
            _this.user = jsonArray[0];
            console.log('I Received user: ' + JSON.stringify(_this.user));
            if (_this.user != '0') {
                console.log('Who IS: ' + _this.whoIs);
                if (_this.user.Pass == userpass) {
                    if (_this.whoIs == 'teacher') {
                        console.log('the TeacherID is: ' + _this.user.TeacherID);
                        _this.storage.set(TEACHERID, _this.user.TeacherID).then(function () {
                            _this.storage.set(WHOIS, 'teacher').then(function () {
                                _this.responseTxt = '';
                                _this.router.navigate(['members', 'teacherdash']);
                            });
                        });
                    }
                    else if (_this.whoIs == 'student') {
                        console.log('the StudentID is: ' + _this.user.stID);
                        _this.storage.set(USERID, _this.user.stID).then(function () {
                            _this.storage.set(WHOIS, 'student').then(function () {
                                _this.responseTxt = '';
                                _this.router.navigate(['members', 'dashboard']);
                            });
                        });
                    }
                    else if (_this.whoIs == 'parent') {
                        console.log('the ParentID is: ' + _this.user.ParentID);
                        _this.storage.set(PARENT, _this.user).then(function () {
                            _this.storage.set(WHOIS, 'parent').then(function () {
                                _this.responseTxt = '';
                                _this.router.navigate(['parentdash']);
                            });
                        });
                    }
                    //this.authService.login(username, this.whoIs);
                }
                else {
                    _this.responseTxt = 'The Password is Incorrect';
                }
            }
            else {
                _this.responseTxt = 'The Username is Incorrect';
            }
        });
    };
    HomePage.prototype.showData = function (data) {
        var jsonArray = data;
        this.canProceed = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.canProceed.push(jsonObject);
        }
    };
    HomePage.prototype.changeWhoIsToStudent = function () {
        this.whoIs = 'student';
        console.log('the whoIs: ' + this.whoIs);
    };
    HomePage.prototype.changeWhoIsToTeacher = function () {
        this.whoIs = 'teacher';
        console.log('the whoIs: ' + this.whoIs);
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, NetworkEngineService, Storage,
            AuthenticationService, Router, Platform])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map