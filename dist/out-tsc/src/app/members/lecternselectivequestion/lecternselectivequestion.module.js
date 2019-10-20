import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecternselectivequestionPage } from './lecternselectivequestion.page';
var routes = [
    {
        path: '',
        component: LecternselectivequestionPage
    }
];
var LecternselectivequestionPageModule = /** @class */ (function () {
    function LecternselectivequestionPageModule() {
    }
    LecternselectivequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecternselectivequestionPage]
        })
    ], LecternselectivequestionPageModule);
    return LecternselectivequestionPageModule;
}());
export { LecternselectivequestionPageModule };
//# sourceMappingURL=lecternselectivequestion.module.js.map