import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudenthomeworkquestionslistPage } from './studenthomeworkquestionslist.page';
var routes = [
    {
        path: '',
        component: StudenthomeworkquestionslistPage
    }
];
var StudenthomeworkquestionslistPageModule = /** @class */ (function () {
    function StudenthomeworkquestionslistPageModule() {
    }
    StudenthomeworkquestionslistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudenthomeworkquestionslistPage]
        })
    ], StudenthomeworkquestionslistPageModule);
    return StudenthomeworkquestionslistPageModule;
}());
export { StudenthomeworkquestionslistPageModule };
//# sourceMappingURL=studenthomeworkquestionslist.module.js.map