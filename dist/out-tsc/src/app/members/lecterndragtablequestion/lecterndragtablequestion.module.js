import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecterndragtablequestionPage } from './lecterndragtablequestion.page';
import { DragulaModule } from 'ng2-dragula';
var routes = [
    {
        path: '',
        component: LecterndragtablequestionPage
    }
];
var LecterndragtablequestionPageModule = /** @class */ (function () {
    function LecterndragtablequestionPageModule() {
    }
    LecterndragtablequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                DragulaModule
            ],
            declarations: [LecterndragtablequestionPage]
        })
    ], LecterndragtablequestionPageModule);
    return LecterndragtablequestionPageModule;
}());
export { LecterndragtablequestionPageModule };
//# sourceMappingURL=lecterndragtablequestion.module.js.map