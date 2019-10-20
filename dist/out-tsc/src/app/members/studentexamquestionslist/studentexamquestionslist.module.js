import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentexamquestionslistPage } from './studentexamquestionslist.page';
var routes = [
    {
        path: '',
        component: StudentexamquestionslistPage
    }
];
var StudentexamquestionslistPageModule = /** @class */ (function () {
    function StudentexamquestionslistPageModule() {
    }
    StudentexamquestionslistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentexamquestionslistPage]
        })
    ], StudentexamquestionslistPageModule);
    return StudentexamquestionslistPageModule;
}());
export { StudentexamquestionslistPageModule };
//# sourceMappingURL=studentexamquestionslist.module.js.map