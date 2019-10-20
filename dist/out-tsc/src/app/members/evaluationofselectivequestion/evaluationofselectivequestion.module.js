import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofselectivequestionPage } from './evaluationofselectivequestion.page';
var routes = [
    {
        path: '',
        component: EvaluationofselectivequestionPage
    }
];
var EvaluationofselectivequestionPageModule = /** @class */ (function () {
    function EvaluationofselectivequestionPageModule() {
    }
    EvaluationofselectivequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofselectivequestionPage]
        })
    ], EvaluationofselectivequestionPageModule);
    return EvaluationofselectivequestionPageModule;
}());
export { EvaluationofselectivequestionPageModule };
//# sourceMappingURL=evaluationofselectivequestion.module.js.map