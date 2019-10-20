import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecternmaintitlepagePage } from './lecternmaintitlepage.page';
var routes = [
    {
        path: '',
        component: LecternmaintitlepagePage
    }
];
var LecternmaintitlepagePageModule = /** @class */ (function () {
    function LecternmaintitlepagePageModule() {
    }
    LecternmaintitlepagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecternmaintitlepagePage]
        })
    ], LecternmaintitlepagePageModule);
    return LecternmaintitlepagePageModule;
}());
export { LecternmaintitlepagePageModule };
//# sourceMappingURL=lecternmaintitlepage.module.js.map