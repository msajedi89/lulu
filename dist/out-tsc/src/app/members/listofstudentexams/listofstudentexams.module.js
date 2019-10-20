import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListofstudentexamsPage } from './listofstudentexams.page';
var routes = [
    {
        path: '',
        component: ListofstudentexamsPage
    }
];
var ListofstudentexamsPageModule = /** @class */ (function () {
    function ListofstudentexamsPageModule() {
    }
    ListofstudentexamsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListofstudentexamsPage]
        })
    ], ListofstudentexamsPageModule);
    return ListofstudentexamsPageModule;
}());
export { ListofstudentexamsPageModule };
//# sourceMappingURL=listofstudentexams.module.js.map