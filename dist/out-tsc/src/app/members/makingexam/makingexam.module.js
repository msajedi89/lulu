import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { MakingexamPage } from './makingexam.page';
var routes = [
    {
        path: '',
        component: MakingexamPage
    }
];
var MakingexamPageModule = /** @class */ (function () {
    function MakingexamPageModule() {
    }
    MakingexamPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [MakingexamPage]
        })
    ], MakingexamPageModule);
    return MakingexamPageModule;
}());
export { MakingexamPageModule };
//# sourceMappingURL=makingexam.module.js.map