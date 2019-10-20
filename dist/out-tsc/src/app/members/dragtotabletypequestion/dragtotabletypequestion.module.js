import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { DragtotabletypequestionPage } from './dragtotabletypequestion.page';
var routes = [
    {
        path: '',
        component: DragtotabletypequestionPage
    }
];
var DragtotabletypequestionPageModule = /** @class */ (function () {
    function DragtotabletypequestionPageModule() {
    }
    DragtotabletypequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [DragtotabletypequestionPage]
        })
    ], DragtotabletypequestionPageModule);
    return DragtotabletypequestionPageModule;
}());
export { DragtotabletypequestionPageModule };
//# sourceMappingURL=dragtotabletypequestion.module.js.map