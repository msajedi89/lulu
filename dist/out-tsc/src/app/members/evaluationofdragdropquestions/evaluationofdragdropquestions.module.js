import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofdragdropquestionsPage } from './evaluationofdragdropquestions.page';
var routes = [
    {
        path: '',
        component: EvaluationofdragdropquestionsPage
    }
];
var EvaluationofdragdropquestionsPageModule = /** @class */ (function () {
    function EvaluationofdragdropquestionsPageModule() {
    }
    EvaluationofdragdropquestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofdragdropquestionsPage]
        })
    ], EvaluationofdragdropquestionsPageModule);
    return EvaluationofdragdropquestionsPageModule;
}());
export { EvaluationofdragdropquestionsPageModule };
//# sourceMappingURL=evaluationofdragdropquestions.module.js.map