import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { IonicModule } from '@ionic/angular';
import { StudentdragdropquestionPage } from './studentdragdropquestion.page';
var routes = [
    {
        path: '',
        component: StudentdragdropquestionPage
    }
];
var StudentdragdropquestionPageModule = /** @class */ (function () {
    function StudentdragdropquestionPageModule() {
    }
    StudentdragdropquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                DragulaModule
            ],
            declarations: [StudentdragdropquestionPage]
        })
    ], StudentdragdropquestionPageModule);
    return StudentdragdropquestionPageModule;
}());
export { StudentdragdropquestionPageModule };
//# sourceMappingURL=studentdragdropquestion.module.js.map