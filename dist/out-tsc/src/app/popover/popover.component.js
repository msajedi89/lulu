import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
// for pop up
var DESCRIPTIONENGLISH = 'descriptionEnglish';
var DESCRIPTIONARABIC = 'descriptionArabic';
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(storage) {
        var _this = this;
        this.storage = storage;
        this.descEnglish = '';
        this.descArabic = '';
        this.storage.get(DESCRIPTIONENGLISH).then(function (enData) {
            _this.descEnglish = enData;
            console.log('the descEnglish: ' + _this.descEnglish);
        });
        this.storage.get(DESCRIPTIONARABIC).then(function (arData) {
            _this.descArabic = arData;
            console.log('the descArabic: ' + _this.descArabic);
        });
    }
    PopoverComponent.prototype.ngOnInit = function () { };
    PopoverComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popover',
            templateUrl: './popover.component.html',
            styleUrls: ['./popover.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=popover.component.js.map