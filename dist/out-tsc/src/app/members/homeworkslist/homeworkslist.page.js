import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';
import { ActionSheetController, ToastController, Platform, NavController } from '@ionic/angular';
var HomeworkslistPage = /** @class */ (function () {
    function HomeworkslistPage(router, platform, network, toastController, actionSheetController, navCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.navCtrl = navCtrl;
        this.students = null;
        this.studentIDs = [];
        this.myStudentIDs = '';
    }
    HomeworkslistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Students
            _this.network.getAllStudents().then(function (studentData) {
                _this.allStudents = studentData;
                console.log('I recieved Students: ' + JSON.stringify(_this.allStudents));
            });
        });
    };
    HomeworkslistPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    // ***************** Question Choosing *****************
    HomeworkslistPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
    };
    // when the Students Selectabe has been closed
    HomeworkslistPage.prototype.onCloseStudent = function () {
        console.log('Students: ', this.students);
        //const studentArray = this.students[0];
        this.myStudentIDs = this.students.stID;
        //this.showStudentIDs(this.students);
        console.log('the Selected Students ID: ' + this.myStudentIDs);
        //this.myStudentIDs = this.studentIDs + "";
        //console.log("I received the Selected Students IDs in String: " + this.myStudentIDs);
    };
    // show a Toast.
    HomeworkslistPage.prototype.presentToast = function (text) {
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
    // the method for getting IDs from returning JSON 
    HomeworkslistPage.prototype.showStudentIDs = function (data) {
        var jsonArray = data;
        this.studentIDs = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.studentIDs.push(jsonObject.stID);
        }
    };
    // **************** Inserting Exam ***************
    HomeworkslistPage.prototype.insertHomework = function (name, homeworks, homeworkDate) {
        var _this = this;
        if ((name != null) && (homeworks != null) && (this.myStudentIDs != "") && (homeworkDate != null)) {
            // insert homework in table for selected Student
            this.network.insertHomeworksList(name, homeworks, homeworkDate, this.myStudentIDs).then(function (resultData) {
                _this.myStudentIDs = '';
                console.log('The result of inserting homework is: ' + resultData);
                _this.presentToast('A new Homework has been inserted for selected Student.');
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert('Please fill the Required fields');
        }
    };
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], HomeworkslistPage.prototype, "selectComponent", void 0);
    HomeworkslistPage = tslib_1.__decorate([
        Component({
            selector: 'app-homeworkslist',
            templateUrl: './homeworkslist.page.html',
            styleUrls: ['./homeworkslist.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, NavController])
    ], HomeworkslistPage);
    return HomeworkslistPage;
}());
export { HomeworkslistPage };
//# sourceMappingURL=homeworkslist.page.js.map