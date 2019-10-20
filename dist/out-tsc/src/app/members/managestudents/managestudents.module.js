import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManagestudentsPage } from './managestudents.page';
var routes = [
    {
        path: '',
        component: ManagestudentsPage
    }
];
var ManagestudentsPageModule = /** @class */ (function () {
    function ManagestudentsPageModule() {
    }
    ManagestudentsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManagestudentsPage]
        })
    ], ManagestudentsPageModule);
    return ManagestudentsPageModule;
}());
export { ManagestudentsPageModule };
//# sourceMappingURL=managestudents.module.js.map