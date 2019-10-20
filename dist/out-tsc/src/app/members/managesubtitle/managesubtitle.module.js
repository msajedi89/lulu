import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManagesubtitlePage } from './managesubtitle.page';
var routes = [
    {
        path: '',
        component: ManagesubtitlePage
    }
];
var ManagesubtitlePageModule = /** @class */ (function () {
    function ManagesubtitlePageModule() {
    }
    ManagesubtitlePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManagesubtitlePage]
        })
    ], ManagesubtitlePageModule);
    return ManagesubtitlePageModule;
}());
export { ManagesubtitlePageModule };
//# sourceMappingURL=managesubtitle.module.js.map