import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NetworkEngineService } from '../../network-engine.service';
var PARENT = 'parent';
var LANGUAGE = 'language';
var ParentdashPage = /** @class */ (function () {
    function ParentdashPage(router, storage, network) {
        var _this = this;
        this.router = router;
        this.storage = storage;
        this.network = network;
        this.parentID = '';
        this.parent = '';
        this.studentsList = '';
        this.studentProfileImgPath = '';
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    ParentdashPage.prototype.ngOnInit = function () {
        var _this = this;
        // get the Student Profile Image Path
        this.studentProfileImgPath = this.network.mainStudentsProfileImgUrl;
        // get the parent info
        this.storage.get(PARENT).then(function (parentInfo) {
            _this.parent = parentInfo;
            console.log('the Parent Loaded in Dashboard: ' + JSON.stringify(_this.parent));
            _this.parentID = _this.parent.ParentID;
            console.log('the parentID is: ' + _this.parentID);
            // get the list of Students of this parent
            _this.network.getStudentByParentID(_this.parentID).then(function (studentsData) {
                _this.studentsList = studentsData;
                console.log('the list of Students: ' + JSON.stringify(_this.studentsList));
            });
        });
    };
    ParentdashPage.prototype.logout = function () {
        var _this = this;
        this.storage.remove(PARENT).then(function () {
            _this.router.navigate(['home']);
        });
    };
    // go to add student page
    ParentdashPage.prototype.addStudent = function () {
        this.router.navigate(['addstudent']);
    };
    ParentdashPage = tslib_1.__decorate([
        Component({
            selector: 'app-parentdash',
            templateUrl: './parentdash.page.html',
            styleUrls: ['./parentdash.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Storage, NetworkEngineService])
    ], ParentdashPage);
    return ParentdashPage;
}());
export { ParentdashPage };
//# sourceMappingURL=parentdash.page.js.map