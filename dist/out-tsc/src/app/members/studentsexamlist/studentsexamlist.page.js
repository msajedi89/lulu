import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineService } from '../../network-engine.service';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var studentKey = 'student';
var studentExamKey = 'studentexam';
var StudentsexamlistPage = /** @class */ (function () {
    function StudentsexamlistPage(router, platform, network, navCtrl, storage) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.profileImgUrl = "";
    }
    StudentsexamlistPage.prototype.ngOnInit = function () {
        var _this = this;
        // 1-detection of entered student    2-get his/her information
        this.storage.get(studentKey).then(function (result) {
            _this.stID = result;
            console.log("this page recieved stID: " + _this.stID);
            // get the Student
            _this.network.getStudentByID(_this.stID).then(function (data) {
                _this.showData(data);
                console.log("I recieved this Student: " + JSON.stringify(data));
                _this.profileImgUrl = _this.network.mainStudentsProfileImgUrl + _this.profileImg;
                // get the list of this Student's Exam
                _this.network.getStudentsExamsList(_this.stID).then(function (data) {
                    _this.examList = data;
                    console.log("the exam list: " + JSON.stringify(_this.examList));
                });
            });
        });
    };
    StudentsexamlistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'studentsexam']);
    };
    StudentsexamlistPage.prototype.showData = function (data) {
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
    StudentsexamlistPage.prototype.goToStudentExam = function (stExamID) {
        var _this = this;
        this.storage.set(studentExamKey, stExamID).then(function (result) {
            console.log('the stExamID for next page: ' + result);
            _this.router.navigate(['members', 'examevaluation']);
        });
    };
    StudentsexamlistPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentsexamlist',
            templateUrl: './studentsexamlist.page.html',
            styleUrls: ['./studentsexamlist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, NavController,
            Storage])
    ], StudentsexamlistPage);
    return StudentsexamlistPage;
}());
export { StudentsexamlistPage };
//# sourceMappingURL=studentsexamlist.page.js.map