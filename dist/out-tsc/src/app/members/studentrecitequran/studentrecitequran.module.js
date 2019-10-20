import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentrecitequranPage } from './studentrecitequran.page';
var routes = [
    {
        path: '',
        component: StudentrecitequranPage
    }
];
var StudentrecitequranPageModule = /** @class */ (function () {
    function StudentrecitequranPageModule() {
    }
    StudentrecitequranPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentrecitequranPage]
        })
    ], StudentrecitequranPageModule);
    return StudentrecitequranPageModule;
}());
export { StudentrecitequranPageModule };
//# sourceMappingURL=studentrecitequran.module.js.map