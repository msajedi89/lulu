import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecternsubtitlepagePage } from './lecternsubtitlepage.page';
var routes = [
    {
        path: '',
        component: LecternsubtitlepagePage
    }
];
var LecternsubtitlepagePageModule = /** @class */ (function () {
    function LecternsubtitlepagePageModule() {
    }
    LecternsubtitlepagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecternsubtitlepagePage]
        })
    ], LecternsubtitlepagePageModule);
    return LecternsubtitlepagePageModule;
}());
export { LecternsubtitlepagePageModule };
//# sourceMappingURL=lecternsubtitlepage.module.js.map