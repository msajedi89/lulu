import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeworkevaluationPage } from './homeworkevaluation.page';
var routes = [
    {
        path: '',
        component: HomeworkevaluationPage
    }
];
var HomeworkevaluationPageModule = /** @class */ (function () {
    function HomeworkevaluationPageModule() {
    }
    HomeworkevaluationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomeworkevaluationPage]
        })
    ], HomeworkevaluationPageModule);
    return HomeworkevaluationPageModule;
}());
export { HomeworkevaluationPageModule };
//# sourceMappingURL=homeworkevaluation.module.js.map