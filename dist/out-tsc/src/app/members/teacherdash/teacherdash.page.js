import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
var ROOT = 'questionroot';
var TEACHERID = 'teacherid';
var TeacherdashPage = /** @class */ (function () {
    function TeacherdashPage(router, navCtrl, storage, authService, network) {
        this.router = router;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.authService = authService;
        this.network = network;
        this.teacherID = '';
        this.teacher = '';
        this.profileImg = '../../../assets/imgs/default-user.jpg';
        this.myColor1 = '#fff';
        this.myColor2 = '#fff';
        this.myColor3 = '#fff';
        this.myColor4 = '#fff';
        this.myColor5 = '#fff';
        this.myColor6 = '#fff';
        this.myColor7 = '#fff';
        this.myColor8 = '#fff';
        this.myColor9 = '#fff';
    }
    TeacherdashPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get(TEACHERID).then(function (userID) {
            _this.teacherID = userID;
            console.log('the teacherID: ' + _this.teacherID);
            _this.network.getTeacherByID(_this.teacherID).then(function (teacherData) {
                var jsonArray = teacherData;
                _this.teacher = jsonArray[0];
                console.log('the teacher: ' + JSON.stringify(_this.teacher));
                if (_this.teacher.ProfileImg == '') {
                    _this.profileImg = '../../../assets/imgs/default-user.jpg';
                }
                else if (_this.teacher.ProfileImg == null) {
                    _this.profileImg = '../../../assets/imgs/default-user.jpg';
                }
                else {
                    _this.profileImg = _this.network.mainTeacherProfileImgURL + _this.teacher.ProfileImg;
                }
            });
        });
    };
    TeacherdashPage.prototype.logout = function () {
        this.authService.logout();
    };
    TeacherdashPage.prototype.goToQuestions = function () {
        var _this = this;
        this.myColor1 = '#0fadf0';
        setInterval(function () {
            _this.myColor1 = '#fff';
        }, 200);
        this.router.navigate(['members', 'questions']);
    };
    TeacherdashPage.prototype.gotoLectern = function () {
        this.router.navigate(['members', 'questions']);
    };
    TeacherdashPage.prototype.goToMakingExam = function () {
        var _this = this;
        this.myColor3 = '#0fadf0';
        setInterval(function () {
            _this.myColor3 = '#fff';
        }, 200);
        this.router.navigate(['members', 'makingexam']);
    };
    TeacherdashPage.prototype.goToMakingHomework = function () {
        var _this = this;
        this.myColor2 = '#0fadf0';
        setInterval(function () {
            _this.myColor2 = '#fff';
        }, 200);
        this.router.navigate(['members', 'makinghomework']);
    };
    TeacherdashPage.prototype.goToHomework = function () {
        var _this = this;
        this.myColor9 = '#0fadf0';
        setInterval(function () {
            _this.myColor9 = '#fff';
        }, 200);
        this.router.navigate(['members', 'homeworkslist']);
    };
    TeacherdashPage.prototype.goToStudentsList = function (fromWhere) {
        var _this = this;
        if (fromWhere == 'homework') {
            this.myColor4 = '#0fadf0';
            setInterval(function () {
                _this.myColor4 = '#fff';
            }, 200);
        }
        else if (fromWhere == 'exam') {
            this.myColor5 = '#0fadf0';
            setInterval(function () {
                _this.myColor5 = '#fff';
            }, 200);
        }
        // determines for the next pages for rooting and where to go and come back
        this.storage.set(ROOT, fromWhere).then(function () {
            _this.router.navigate(['members', 'studentsexam']);
        });
    };
    TeacherdashPage.prototype.goToManageTitles = function () {
        var _this = this;
        this.myColor7 = '#0fadf0';
        setInterval(function () {
            _this.myColor7 = '#fff';
        }, 200);
        this.router.navigate(['members', 'managetitles']);
    };
    TeacherdashPage.prototype.goToManageStudents = function () {
        var _this = this;
        this.myColor6 = '#0fadf0';
        setInterval(function () {
            _this.myColor6 = '#fff';
        }, 200);
        this.router.navigate(['members', 'managestudents']);
    };
    TeacherdashPage.prototype.goToEditProfile = function () {
        var _this = this;
        this.myColor8 = '#0fadf0';
        setInterval(function () {
            _this.myColor8 = '#fff';
        }, 200);
        this.router.navigate(['members', 'editteacherprofile']);
    };
    TeacherdashPage = tslib_1.__decorate([
        Component({
            selector: 'app-teacherdash',
            templateUrl: './teacherdash.page.html',
            styleUrls: ['./teacherdash.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController, Storage, AuthenticationService,
            NetworkEngineService])
    ], TeacherdashPage);
    return TeacherdashPage;
}());
export { TeacherdashPage };
//# sourceMappingURL=teacherdash.page.js.map