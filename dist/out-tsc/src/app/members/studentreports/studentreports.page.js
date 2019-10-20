import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var LANGUAGE = 'language';
var StudentreportsPage = /** @class */ (function () {
    function StudentreportsPage(router, platform, navCtrl, storage) {
        var _this = this;
        this.router = router;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.language = '';
        // get the language from storage and set the dashboard language
        this.storage.get(LANGUAGE).then(function (resultLanguage) {
            _this.language = resultLanguage;
            console.log('the language is: ' + _this.language);
        });
    }
    StudentreportsPage.prototype.ngOnInit = function () {
    };
    StudentreportsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'dashboard']);
    };
    StudentreportsPage.prototype.goToCheckExamProgress = function () {
        this.router.navigate(['members', 'reportexamprogress']);
    };
    StudentreportsPage = tslib_1.__decorate([
        Component({
            selector: 'app-studentreports',
            templateUrl: './studentreports.page.html',
            styleUrls: ['./studentreports.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NavController, Storage])
    ], StudentreportsPage);
    return StudentreportsPage;
}());
export { StudentreportsPage };
//# sourceMappingURL=studentreports.page.js.map