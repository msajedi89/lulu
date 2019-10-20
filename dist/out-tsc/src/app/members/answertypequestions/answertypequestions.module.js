import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { AnswertypequestionsPage } from './answertypequestions.page';
var routes = [
    {
        path: '',
        component: AnswertypequestionsPage
    }
];
var AnswertypequestionsPageModule = /** @class */ (function () {
    function AnswertypequestionsPageModule() {
    }
    AnswertypequestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [AnswertypequestionsPage]
        })
    ], AnswertypequestionsPageModule);
    return AnswertypequestionsPageModule;
}());
export { AnswertypequestionsPageModule };
//# sourceMappingURL=answertypequestions.module.js.map