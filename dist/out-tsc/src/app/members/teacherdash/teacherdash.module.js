import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TeacherdashPage } from './teacherdash.page';
var routes = [
    {
        path: '',
        component: TeacherdashPage
    }
];
var TeacherdashPageModule = /** @class */ (function () {
    function TeacherdashPageModule() {
    }
    TeacherdashPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TeacherdashPage]
        })
    ], TeacherdashPageModule);
    return TeacherdashPageModule;
}());
export { TeacherdashPageModule };
//# sourceMappingURL=teacherdash.module.js.map