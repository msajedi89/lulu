import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentsdragdropPage } from './studentsdragdrop.page';
import { DragulaModule } from 'ng2-dragula';
var routes = [
    {
        path: '',
        component: StudentsdragdropPage
    }
];
var StudentsdragdropPageModule = /** @class */ (function () {
    function StudentsdragdropPageModule() {
    }
    StudentsdragdropPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                DragulaModule
            ],
            declarations: [StudentsdragdropPage]
        })
    ], StudentsdragdropPageModule);
    return StudentsdragdropPageModule;
}());
export { StudentsdragdropPageModule };
//# sourceMappingURL=studentsdragdrop.module.js.map