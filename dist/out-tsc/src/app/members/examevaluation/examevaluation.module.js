import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExamevaluationPage } from './examevaluation.page';
var routes = [
    {
        path: '',
        component: ExamevaluationPage
    }
];
var ExamevaluationPageModule = /** @class */ (function () {
    function ExamevaluationPageModule() {
    }
    ExamevaluationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ExamevaluationPage]
        })
    ], ExamevaluationPageModule);
    return ExamevaluationPageModule;
}());
export { ExamevaluationPageModule };
//# sourceMappingURL=examevaluation.module.js.map