import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var studentKey = 'student';
var STUDENTHOMEWORKID = 'homeworkid';
var StudentshomeworklistPage = /** @class */ (function () {
    function StudentshomeworklistPage(router, platform, network, navCtrl, storage) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.profileImgUrl = '';
    }
    StudentshomeworklistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // 1-detection of entered student    2-get his/her information
            _this.storage.get(studentKey).then(function (result) {
                _this.stID = result;
                console.log('this page recieved stID: ' + _this.stID);
                // get the Student
                _this.network.getStudentByID(_this.stID).then(function (data) {
                    _this.showData(data);
                    console.log('I recieved this Student: ' + JSON.stringify(data));
                    _this.profileImgUrl = _this.network.mainStudentsProfileImgUrl + _this.profileImg;
                    // get the list of this Student's Exam
                    _this.network.getStudentsHomeworksList(_this.stID).then(function (homeworksData) {
                        _this.examList = homeworksData;
                        console.log('the homeworks list: ' + JSON.stringify(_this.examList));
                    });
                });
            });
        });
    };
    StudentshomeworklistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'studentsexam']);
    };
    StudentshomeworklistPage.prototype.showData = function (data) {
        var jsonArray = data;
        this.namefamily = [];
        this.profileImg = [];
        this.birthdate = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.namefamily.push(jsonObject.NameFamily);
            this.profileImg.push(jsonObject.ProfileImg);
            this.birthdate.push(jsonObject.Birthdate);
        }
    };
    // go to Clicked Student Exam
    StudentshomeworklistPage.prototype.goToStudentHomework = function (hwkID) {
        var _this = this;
        this.storage.set(STUDENTHOMEWORKID, hwkID).then(function (result) {
            console.log('the hwkID for next page: ' + result);
            _this.router.navigate(['members', 'homeworkevaluation']);
        });
    };
    StudentshomeworklistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentshomeworklist',
            templateUrl: './studentshomeworklist.page.html',
            styleUrls: ['./studentshomeworklist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], StudentshomeworklistPage);
    return StudentshomeworklistPage;
}());
export { StudentshomeworklistPage };
//# sourceMappingURL=studentshomeworklist.page.js.map