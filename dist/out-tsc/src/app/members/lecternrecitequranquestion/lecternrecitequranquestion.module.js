import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecternrecitequranquestionPage } from './lecternrecitequranquestion.page';
var routes = [
    {
        path: '',
        component: LecternrecitequranquestionPage
    }
];
var LecternrecitequranquestionPageModule = /** @class */ (function () {
    function LecternrecitequranquestionPageModule() {
    }
    LecternrecitequranquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecternrecitequranquestionPage]
        })
    ], LecternrecitequranquestionPageModule);
    return LecternrecitequranquestionPageModule;
}());
export { LecternrecitequranquestionPageModule };
//# sourceMappingURL=lecternrecitequranquestion.module.js.map