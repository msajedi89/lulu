import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofrecitequranquestionsPage } from './evaluationofrecitequranquestions.page';
var routes = [
    {
        path: '',
        component: EvaluationofrecitequranquestionsPage
    }
];
var EvaluationofrecitequranquestionsPageModule = /** @class */ (function () {
    function EvaluationofrecitequranquestionsPageModule() {
    }
    EvaluationofrecitequranquestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofrecitequranquestionsPage]
        })
    ], EvaluationofrecitequranquestionsPageModule);
    return EvaluationofrecitequranquestionsPageModule;
}());
export { EvaluationofrecitequranquestionsPageModule };
//# sourceMappingURL=evaluationofrecitequranquestions.module.js.map