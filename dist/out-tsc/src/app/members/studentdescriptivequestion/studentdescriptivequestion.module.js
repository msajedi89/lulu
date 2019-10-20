import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentdescriptivequestionPage } from './studentdescriptivequestion.page';
var routes = [
    {
        path: '',
        component: StudentdescriptivequestionPage
    }
];
var StudentdescriptivequestionPageModule = /** @class */ (function () {
    function StudentdescriptivequestionPageModule() {
    }
    StudentdescriptivequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentdescriptivequestionPage]
        })
    ], StudentdescriptivequestionPageModule);
    return StudentdescriptivequestionPageModule;
}());
export { StudentdescriptivequestionPageModule };
//# sourceMappingURL=studentdescriptivequestion.module.js.map