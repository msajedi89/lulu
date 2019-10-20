import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentdrawingquestionPage } from './studentdrawingquestion.page';
var routes = [
    {
        path: '',
        component: StudentdrawingquestionPage
    }
];
var StudentdrawingquestionPageModule = /** @class */ (function () {
    function StudentdrawingquestionPageModule() {
    }
    StudentdrawingquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentdrawingquestionPage]
        })
    ], StudentdrawingquestionPageModule);
    return StudentdrawingquestionPageModule;
}());
export { StudentdrawingquestionPageModule };
//# sourceMappingURL=studentdrawingquestion.module.js.map