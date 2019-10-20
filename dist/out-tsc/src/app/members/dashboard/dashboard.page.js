import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
var USERID = 'userid';
var LANGUAGE = 'language';
var DashboardPage = /** @class */ (function () {
    // tslint:disable-next-line: max-line-length
    function DashboardPage(router, authService, storage, network) {
        var _this = this;
        this.router = router;
        this.authService = authService;
        this.storage = storage;
        this.network = network;
        this.studentID = '';
        this.student = '';
        this.profileImg = '';
        this.myColor1 = '#fff';
        this.myColor2 = '#fff';
        this.myColor3 = '#fff';
        this.myColor4 = '#fff';
        this.myColor5 = '#fff';
        this.myColor6 = '#fff';
        this.myColor7 = '#fff';
        this.myColor8 = '#fff';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    DashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(USERID).then(function (userID) {
            _this.studentID = userID;
            console.log('the studentID: ' + _this.studentID);
            _this.network.getStudentByID(_this.studentID).then(function (studentData) {
                var jsonArray = studentData;
                _this.student = jsonArray[0];
                console.log('the Student: ' + JSON.stringify(_this.student));
                if (_this.student.ProfileImg == '') {
                    _this.profileImg = '../../../assets/imgs/default-user.jpg';
                }
                else {
                    _this.profileImg = _this.network.mainStudentsProfileImgUrl + _this.student.ProfileImg;
                }
            });
        });
    };
    DashboardPage.prototype.logout = function () {
        //this.storage.clear();
        this.authService.logout();
    };
    DashboardPage.prototype.goToDragDrop = function () {
        this.router.navigate(['members', 'studentdragdropquestion']);
    };
    DashboardPage.prototype.goToStudentDragDrop = function () {
        this.router.navigate(['members', 'studentsdragdrop']);
    };
    DashboardPage.prototype.goToStudentSelectiveQuestions = function () {
        this.router.navigate(['members', 'studentselectivequestions']);
    };
    DashboardPage.prototype.goToStudentDragToTableQuestion = function () {
        this.router.navigate(['members', 'studentsdragtotablequestion']);
    };
    DashboardPage.prototype.goToStudentDrawingQuestion = function () {
        this.router.navigate(['members', 'studentdrawingquestion']);
    };
    DashboardPage.prototype.goToStudentDescriptiveQuestion = function () {
        this.router.navigate(['members', 'studentdescriptivequestion']);
    };
    DashboardPage.prototype.goToStudentReciteQuran = function () {
        this.router.navigate(['members', 'studentrecitequran']);
    };
    DashboardPage.prototype.goToExamsList = function () {
        var _this = this;
        this.myColor1 = '#0fadf0';
        setInterval(function () {
            _this.myColor1 = '#fff';
        }, 200);
        this.router.navigate(['members', 'listofstudentexams']);
    };
    DashboardPage.prototype.goToHomeworksList = function () {
        var _this = this;
        this.myColor2 = '#0fadf0';
        setInterval(function () {
            _this.myColor2 = '#fff';
        }, 200);
        this.router.navigate(['members', 'listofstudenthomeworks']);
    };
    DashboardPage.prototype.goToHomeworks = function () {
        var _this = this;
        this.myColor7 = '#0fadf0';
        setInterval(function () {
            _this.myColor7 = '#fff';
        }, 200);
        this.router.navigate(['members', 'studenthomeworks']);
    };
    DashboardPage.prototype.goToListOfTakenExam = function () {
        var _this = this;
        this.myColor3 = '#0fadf0';
        setInterval(function () {
            _this.myColor3 = '#fff';
        }, 200);
        this.router.navigate(['members', 'listofstudentstakenexam']);
    };
    DashboardPage.prototype.goToListOfTakenHomeworks = function () {
        var _this = this;
        this.myColor4 = '#0fadf0';
        setInterval(function () {
            _this.myColor4 = '#fff';
        }, 200);
        this.router.navigate(['members', 'listofstudenttakenhomework']);
    };
    DashboardPage.prototype.goToLecterns = function () {
        var _this = this;
        this.myColor5 = '#0fadf0';
        setInterval(function () {
            _this.myColor5 = '#fff';
        }, 200);
        this.router.navigate(['members', 'lecternmaintitlepage']);
    };
    DashboardPage.prototype.goToEditProfile = function () {
        var _this = this;
        this.myColor6 = '#0fadf0';
        setInterval(function () {
            _this.myColor6 = '#fff';
        }, 200);
        this.router.navigate(['members', 'edituser']);
    };
    DashboardPage.prototype.goToReports = function () {
        var _this = this;
        this.myColor8 = '#0fadf0';
        setInterval(function () {
            _this.myColor8 = '#fff';
        }, 200);
        this.router.navigate(['members', 'studentreports']);
    };
    DashboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, AuthenticationService, Storage, NetworkEngineService])
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map