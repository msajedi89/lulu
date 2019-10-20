import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManagemaintitlePage } from './managemaintitle.page';
var routes = [
    {
        path: '',
        component: ManagemaintitlePage
    }
];
var ManagemaintitlePageModule = /** @class */ (function () {
    function ManagemaintitlePageModule() {
    }
    ManagemaintitlePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManagemaintitlePage]
        })
    ], ManagemaintitlePageModule);
    return ManagemaintitlePageModule;
}());
export { ManagemaintitlePageModule };
//# sourceMappingURL=managemaintitle.module.js.map