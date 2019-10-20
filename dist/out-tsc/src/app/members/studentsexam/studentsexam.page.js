import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var studentKey = 'student';
var ROOT = 'questionroot';
var StudentsexamPage = /** @class */ (function () {
    function StudentsexamPage(router, platform, network, navCtrl, storage) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.mySearch = "";
        this.storage.get(ROOT).then(function (fromwhereResult) {
            _this.fromWhere = fromwhereResult;
            console.log('the root is: ' + _this.fromWhere);
        });
    }
    StudentsexamPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Students 
            _this.network.getAllStudents().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.allStudents = data;
            });
        });
    };
    StudentsexamPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    // Filter Students
    StudentsexamPage.prototype.updateStudents = function () {
        var _this = this;
        if (this.mySearch != "") {
            console.log('my Search: ' + this.mySearch);
            this.network.filterStudents(this.mySearch).then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.allStudents = data;
            });
        }
        else {
            this.network.getAllStudents().then(function (data) {
                console.log('I recieved Main Titles: ' + JSON.stringify(data));
                _this.allStudents = data;
            });
        }
    };
    StudentsexamPage.prototype.showStudentDetails = function (studentID) {
        var _this = this;
        this.storage.set(studentKey, studentID).then(function (result) {
            console.log('the result of storage: ' + result);
            if (_this.fromWhere == 'exam') {
                _this.router.navigate(['members', 'studentsexamlist']);
            }
            else {
                _this.router.navigate(['members', 'studentshomeworklist']);
            }
        });
    };
    StudentsexamPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentsexam',
            templateUrl: './studentsexam.page.html',
            styleUrls: ['./studentsexam.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], StudentsexamPage);
    return StudentsexamPage;
}());
export { StudentsexamPage };
//# sourceMappingURL=studentsexam.page.js.map