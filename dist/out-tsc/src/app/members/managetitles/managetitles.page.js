import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
var ManagetitlesPage = /** @class */ (function () {
    function ManagetitlesPage(router, platform, navCtrl) {
        this.router = router;
        this.platform = platform;
        this.navCtrl = navCtrl;
    }
    ManagetitlesPage.prototype.ngOnInit = function () {
    };
    ManagetitlesPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    ManagetitlesPage.prototype.goToManageMainTitles = function () {
        this.router.navigate(['members', 'managemaintitle']);
    };
    ManagetitlesPage.prototype.goToManageSubTitles = function () {
        this.router.navigate(['members', 'managesubtitle']);
    };
    ManagetitlesPage = tslib_1.__decorate([
        Component({
            selector: 'app-managetitles',
            templateUrl: './managetitles.page.html',
            styleUrls: ['./managetitles.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, Platform, NavController])
    ], ManagetitlesPage);
    return ManagetitlesPage;
}());
export { ManagetitlesPage };
//# sourceMappingURL=managetitles.page.js.map