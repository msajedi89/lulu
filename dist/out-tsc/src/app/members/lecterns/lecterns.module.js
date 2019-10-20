import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecternsPage } from './lecterns.page';
var routes = [
    {
        path: '',
        component: LecternsPage
    }
];
var LecternsPageModule = /** @class */ (function () {
    function LecternsPageModule() {
    }
    LecternsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecternsPage]
        })
    ], LecternsPageModule);
    return LecternsPageModule;
}());
export { LecternsPageModule };
//# sourceMappingURL=lecterns.module.js.map