import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvaluationofdescriptivequestionsPage } from './evaluationofdescriptivequestions.page';
var routes = [
    {
        path: '',
        component: EvaluationofdescriptivequestionsPage
    }
];
var EvaluationofdescriptivequestionsPageModule = /** @class */ (function () {
    function EvaluationofdescriptivequestionsPageModule() {
    }
    EvaluationofdescriptivequestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EvaluationofdescriptivequestionsPage]
        })
    ], EvaluationofdescriptivequestionsPageModule);
    return EvaluationofdescriptivequestionsPageModule;
}());
export { EvaluationofdescriptivequestionsPageModule };
//# sourceMappingURL=evaluationofdescriptivequestions.module.js.map