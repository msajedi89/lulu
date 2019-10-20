import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentsexamlistPage } from './studentsexamlist.page';
var routes = [
    {
        path: '',
        component: StudentsexamlistPage
    }
];
var StudentsexamlistPageModule = /** @class */ (function () {
    function StudentsexamlistPageModule() {
    }
    StudentsexamlistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentsexamlistPage]
        })
    ], StudentsexamlistPageModule);
    return StudentsexamlistPageModule;
}());
export { StudentsexamlistPageModule };
//# sourceMappingURL=studentsexamlist.module.js.map