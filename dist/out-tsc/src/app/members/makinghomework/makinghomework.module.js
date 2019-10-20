import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { MakinghomeworkPage } from './makinghomework.page';
var routes = [
    {
        path: '',
        component: MakinghomeworkPage
    }
];
var MakinghomeworkPageModule = /** @class */ (function () {
    function MakinghomeworkPageModule() {
    }
    MakinghomeworkPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [MakinghomeworkPage]
        })
    ], MakinghomeworkPageModule);
    return MakinghomeworkPageModule;
}());
export { MakinghomeworkPageModule };
//# sourceMappingURL=makinghomework.module.js.map