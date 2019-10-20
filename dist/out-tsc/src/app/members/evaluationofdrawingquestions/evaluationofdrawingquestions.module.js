import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofdrawingquestionsPage } from './evaluationofdrawingquestions.page';
var routes = [
    {
        path: '',
        component: EvaluationofdrawingquestionsPage
    }
];
var EvaluationofdrawingquestionsPageModule = /** @class */ (function () {
    function EvaluationofdrawingquestionsPageModule() {
    }
    EvaluationofdrawingquestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofdrawingquestionsPage]
        })
    ], EvaluationofdrawingquestionsPageModule);
    return EvaluationofdrawingquestionsPageModule;
}());
export { EvaluationofdrawingquestionsPageModule };
//# sourceMappingURL=evaluationofdrawingquestions.module.js.map