import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReportexamprogressPage } from './reportexamprogress.page';
var routes = [
    {
        path: '',
        component: ReportexamprogressPage
    }
];
var ReportexamprogressPageModule = /** @class */ (function () {
    function ReportexamprogressPageModule() {
    }
    ReportexamprogressPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ReportexamprogressPage]
        })
    ], ReportexamprogressPageModule);
    return ReportexamprogressPageModule;
}());
export { ReportexamprogressPageModule };
//# sourceMappingURL=reportexamprogress.module.js.map