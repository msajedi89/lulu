import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudenthomeworkdetailsPage } from './studenthomeworkdetails.page';
var routes = [
    {
        path: '',
        component: StudenthomeworkdetailsPage
    }
];
var StudenthomeworkdetailsPageModule = /** @class */ (function () {
    function StudenthomeworkdetailsPageModule() {
    }
    StudenthomeworkdetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudenthomeworkdetailsPage]
        })
    ], StudenthomeworkdetailsPageModule);
    return StudenthomeworkdetailsPageModule;
}());
export { StudenthomeworkdetailsPageModule };
//# sourceMappingURL=studenthomeworkdetails.module.js.map