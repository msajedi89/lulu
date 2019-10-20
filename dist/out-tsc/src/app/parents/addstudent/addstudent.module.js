import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddstudentPage } from './addstudent.page';
var routes = [
    {
        path: '',
        component: AddstudentPage
    }
];
var AddstudentPageModule = /** @class */ (function () {
    function AddstudentPageModule() {
    }
    AddstudentPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddstudentPage]
        })
    ], AddstudentPageModule);
    return AddstudentPageModule;
}());
export { AddstudentPageModule };
//# sourceMappingURL=addstudent.module.js.map