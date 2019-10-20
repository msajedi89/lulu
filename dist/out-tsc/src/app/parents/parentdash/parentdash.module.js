import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ParentdashPage } from './parentdash.page';
var routes = [
    {
        path: '',
        component: ParentdashPage
    }
];
var ParentdashPageModule = /** @class */ (function () {
    function ParentdashPageModule() {
    }
    ParentdashPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ParentdashPage]
        })
    ], ParentdashPageModule);
    return ParentdashPageModule;
}());
export { ParentdashPageModule };
//# sourceMappingURL=parentdash.module.js.map