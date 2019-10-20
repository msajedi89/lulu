import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentsexamPage } from './studentsexam.page';
var routes = [
    {
        path: '',
        component: StudentsexamPage
    }
];
var StudentsexamPageModule = /** @class */ (function () {
    function StudentsexamPageModule() {
    }
    StudentsexamPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentsexamPage]
        })
    ], StudentsexamPageModule);
    return StudentsexamPageModule;
}());
export { StudentsexamPageModule };
//# sourceMappingURL=studentsexam.module.js.map