import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var STUDENTID = 'studentid';
var FORADDOREDIT = 'addoreditstudent';
var ManagestudentsPage = /** @class */ (function () {
    function ManagestudentsPage(router, platform, network, navCtrl, storage) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.mySearch = "";
    }
    ManagestudentsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Students
            _this.network.getAllStudentsForManaging().then(function (data) {
                _this.allStudents = data;
                console.log('the allStudents: ' + JSON.stringify(_this.allStudents));
            });
        });
    };
    ManagestudentsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    // Filter Students
    ManagestudentsPage.prototype.updateStudents = function () {
        var _this = this;
        if (this.mySearch != '') {
            console.log('my Search: ' + this.mySearch);
            this.network.filterStudentsForManaging(this.mySearch).then(function (data) {
                console.log('I recieved Students: ' + JSON.stringify(data));
                _this.allStudents = data;
            });
        }
        else {
            this.network.getAllStudentsForManaging().then(function (data) {
                console.log('I recieved Students: ' + JSON.stringify(data));
                _this.allStudents = data;
            });
        }
    };
    ManagestudentsPage.prototype.showStudentDetails = function (studentID) {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'edit').then(function () {
            _this.storage.set(STUDENTID, studentID).then(function (result) {
                console.log('the result of storage: ' + result);
                _this.router.navigate(['members', 'edituser']);
            });
        });
    };
    ManagestudentsPage.prototype.goToAddStudent = function () {
        var _this = this;
        this.storage.set(FORADDOREDIT, 'add').then(function () {
            _this.router.navigate(['members', 'edituser']);
        });
    };
    ManagestudentsPage = tslib_1.__decorate([
        Component({
            selector: 'app-managestudents',
            templateUrl: './managestudents.page.html',
            styleUrls: ['./managestudents.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], ManagestudentsPage);
    return ManagestudentsPage;
}());
export { ManagestudentsPage };
//# sourceMappingURL=managestudents.page.js.map