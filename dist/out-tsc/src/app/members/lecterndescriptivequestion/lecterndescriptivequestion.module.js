import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecterndescriptivequestionPage } from './lecterndescriptivequestion.page';
var routes = [
    {
        path: '',
        component: LecterndescriptivequestionPage
    }
];
var LecterndescriptivequestionPageModule = /** @class */ (function () {
    function LecterndescriptivequestionPageModule() {
    }
    LecterndescriptivequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecterndescriptivequestionPage]
        })
    ], LecterndescriptivequestionPageModule);
    return LecterndescriptivequestionPageModule;
}());
export { LecterndescriptivequestionPageModule };
//# sourceMappingURL=lecterndescriptivequestion.module.js.map