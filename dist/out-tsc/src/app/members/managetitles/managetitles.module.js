import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ManagetitlesPage } from './managetitles.page';
var routes = [
    {
        path: '',
        component: ManagetitlesPage
    }
];
var ManagetitlesPageModule = /** @class */ (function () {
    function ManagetitlesPageModule() {
    }
    ManagetitlesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ManagetitlesPage]
        })
    ], ManagetitlesPageModule);
    return ManagetitlesPageModule;
}());
export { ManagetitlesPageModule };
//# sourceMappingURL=managetitles.module.js.map