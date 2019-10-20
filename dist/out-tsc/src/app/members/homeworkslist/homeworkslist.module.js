import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeworkslistPage } from './homeworkslist.page';
import { IonicSelectableModule } from 'ionic-selectable';
var routes = [
    {
        path: '',
        component: HomeworkslistPage
    }
];
var HomeworkslistPageModule = /** @class */ (function () {
    function HomeworkslistPageModule() {
    }
    HomeworkslistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [HomeworkslistPage]
        })
    ], HomeworkslistPageModule);
    return HomeworkslistPageModule;
}());
export { HomeworkslistPageModule };
//# sourceMappingURL=homeworkslist.module.js.map