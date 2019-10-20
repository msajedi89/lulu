import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { NetworkEngineService } from '../../network-engine.service';
import { ActionSheetController, ToastController, Platform, NavController } from '@ionic/angular';
var MakingexamPage = /** @class */ (function () {
    function MakingexamPage(router, platform, network, toastController, actionSheetController, navCtrl) {
        this.router = router;
        this.platform = platform;
        this.network = network;
        this.toastController = toastController;
        this.actionSheetController = actionSheetController;
        this.navCtrl = navCtrl;
        this.questions = [];
        this.questionIDs = [];
        this.myQuestionIDs = "";
        this.students = [];
        this.studentIDs = [];
        this.myStudentIDs = "";
    }
    MakingexamPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // get the list of all Questions
            _this.network.getAllQuestions().then(function (questionData) {
                _this.allQuestions = questionData;
                console.log('I recieved Questions: ' + JSON.stringify(_this.allQuestions));
            });
            // get the list of all Students
            _this.network.getAllStudents().then(function (studentsData) {
                _this.allStudents = studentsData;
                console.log('I recieved students: ' + JSON.stringify(_this.allStudents));
            });
        });
    };
    MakingexamPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    // ***************** Question Choosing *****************
    MakingexamPage.prototype.userChanged = function (event) {
        console.log('event: ', event);
        console.log('users: ', this.allQuestions);
    };
    // when select component has been closed.
    MakingexamPage.prototype.onClose = function () {
        console.log('Questions: ', this.questions);
        this.showQuestionIDs(this.questions);
        console.log("the Selected Question IDs in Array: " + this.questionIDs);
        this.myQuestionIDs = this.questionIDs + "";
        console.log("I received the Selected Questions IDs in String: " + this.myQuestionIDs);
    };
    // when the Students Selectabe has been closed
    MakingexamPage.prototype.onCloseStudent = function () {
        console.log('Students: ', this.students);
        this.showStudentIDs(this.students);
        console.log("the Selected Students IDs in Array: " + this.studentIDs);
        this.myStudentIDs = this.studentIDs + "";
        console.log("I received the Selected Students IDs in String: " + this.myStudentIDs);
    };
    // show a Toast.
    MakingexamPage.prototype.presentToast = function (text) {
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
    // the method for getting QuestionIDs from returning JSON 
    MakingexamPage.prototype.showQuestionIDs = function (data) {
        var jsonArray = data;
        this.questionIDs = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.questionIDs.push(jsonObject.QID);
        }
    };
    // the method for getting IDs from returning JSON 
    MakingexamPage.prototype.showStudentIDs = function (data) {
        var jsonArray = data;
        this.studentIDs = [];
        for (var i = 0; i < jsonArray.length; i++) {
            var jsonObject = jsonArray[i];
            this.studentIDs.push(jsonObject.stID);
            //this.myStudentIDs += jsonObject.stID + ",";
        }
    };
    // **************** Inserting Exam ***************
    MakingexamPage.prototype.insertExam = function (name, subject, examDate) {
        var _this = this;
        if ((name != null) && (subject != null) && (this.myQuestionIDs != "") && (examDate != null)) {
            var myExamID_1;
            this.network.insertExam(name, subject, examDate, this.myQuestionIDs, this.myStudentIDs).then(function (data) {
                myExamID_1 = _this.showData(data);
                console.log("The inserted Exam ID is: " + myExamID_1);
                _this.presentToast("A new Exam with ID: " + myExamID_1 + " has been inserted.");
                // insert an Exam record for Chosen students
                for (var i = 0; i < _this.studentIDs.length; i++) {
                    var stID = _this.studentIDs[i];
                    _this.network.insertStudentExam(myExamID_1, stID).then(function (data) {
                        console.log("I received: " + JSON.stringify(data));
                    }, function (err) {
                        console.log(err);
                        alert(err);
                    });
                }
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Please fill the Required fields");
        }
    };
    MakingexamPage.prototype.showData = function (data) {
        var jsonArray = data;
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var obj = jsonArray_1[_i];
            for (var key in obj) {
                this.returnValue = obj[key];
            }
        }
        return this.returnValue;
    };
    tslib_1.__decorate([
        ViewChild('myselect'),
        tslib_1.__metadata("design:type", IonicSelectableComponent)
    ], MakingexamPage.prototype, "selectComponent", void 0);
    MakingexamPage = tslib_1.__decorate([
        Component({
            selector: 'app-makingexam',
            templateUrl: './makingexam.page.html',
            styleUrls: ['./makingexam.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NetworkEngineService, ToastController,
            ActionSheetController, NavController])
    ], MakingexamPage);
    return MakingexamPage;
}());
export { MakingexamPage };
//# sourceMappingURL=makingexam.page.js.map