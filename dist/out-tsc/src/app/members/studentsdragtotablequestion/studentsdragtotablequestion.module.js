import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentsdragtotablequestionPage } from './studentsdragtotablequestion.page';
import { DragulaModule } from 'ng2-dragula';
var routes = [
    {
        path: '',
        component: StudentsdragtotablequestionPage
    }
];
var StudentsdragtotablequestionPageModule = /** @class */ (function () {
    function StudentsdragtotablequestionPageModule() {
    }
    StudentsdragtotablequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                DragulaModule
            ],
            declarations: [StudentsdragtotablequestionPage]
        })
    ], StudentsdragtotablequestionPageModule);
    return StudentsdragtotablequestionPageModule;
}());
export { StudentsdragtotablequestionPageModule };
//# sourceMappingURL=studentsdragtotablequestion.module.js.map