import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { DrawletterquestionPage } from './drawletterquestion.page';
var routes = [
    {
        path: '',
        component: DrawletterquestionPage
    }
];
var DrawletterquestionPageModule = /** @class */ (function () {
    function DrawletterquestionPageModule() {
    }
    DrawletterquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [DrawletterquestionPage]
        })
    ], DrawletterquestionPageModule);
    return DrawletterquestionPageModule;
}());
export { DrawletterquestionPageModule };
//# sourceMappingURL=drawletterquestion.module.js.map