import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofdragtotablequestionPage } from './evaluationofdragtotablequestion.page';
var routes = [
    {
        path: '',
        component: EvaluationofdragtotablequestionPage
    }
];
var EvaluationofdragtotablequestionPageModule = /** @class */ (function () {
    function EvaluationofdragtotablequestionPageModule() {
    }
    EvaluationofdragtotablequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofdragtotablequestionPage]
        })
    ], EvaluationofdragtotablequestionPageModule);
    return EvaluationofdragtotablequestionPageModule;
}());
export { EvaluationofdragtotablequestionPageModule };
//# sourceMappingURL=evaluationofdragtotablequestion.module.js.map