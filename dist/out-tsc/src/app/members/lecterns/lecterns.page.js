import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var LecternsPage = /** @class */ (function () {
    function LecternsPage(router) {
        this.router = router;
    }
    LecternsPage.prototype.ngOnInit = function () {
    };
    LecternsPage.prototype.goBack = function () {
        this.router.navigate(['members', 'teacherdash']);
    };
    LecternsPage = tslib_1.__decorate([
        Component({
            selector: 'app-lecterns',
            templateUrl: './lecterns.page.html',
            styleUrls: ['./lecterns.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], LecternsPage);
    return LecternsPage;
}());
export { LecternsPage };
//# sourceMappingURL=lecterns.page.js.map