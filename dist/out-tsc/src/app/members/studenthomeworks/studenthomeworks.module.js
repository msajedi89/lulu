import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudenthomeworksPage } from './studenthomeworks.page';
var routes = [
    {
        path: '',
        component: StudenthomeworksPage
    }
];
var StudenthomeworksPageModule = /** @class */ (function () {
    function StudenthomeworksPageModule() {
    }
    StudenthomeworksPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudenthomeworksPage]
        })
    ], StudenthomeworksPageModule);
    return StudenthomeworksPageModule;
}());
export { StudenthomeworksPageModule };
//# sourceMappingURL=studenthomeworks.module.js.map