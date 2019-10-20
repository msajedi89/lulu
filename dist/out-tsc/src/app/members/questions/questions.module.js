import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuestionsPage } from './questions.page';
var routes = [
    {
        path: '',
        component: QuestionsPage
    }
];
var QuestionsPageModule = /** @class */ (function () {
    function QuestionsPageModule() {
    }
    QuestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [QuestionsPage]
        })
    ], QuestionsPageModule);
    return QuestionsPageModule;
}());
export { QuestionsPageModule };
//# sourceMappingURL=questions.module.js.map