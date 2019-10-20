import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditmaintitlePage } from './editmaintitle.page';
var routes = [
    {
        path: '',
        component: EditmaintitlePage
    }
];
var EditmaintitlePageModule = /** @class */ (function () {
    function EditmaintitlePageModule() {
    }
    EditmaintitlePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditmaintitlePage]
        })
    ], EditmaintitlePageModule);
    return EditmaintitlePageModule;
}());
export { EditmaintitlePageModule };
//# sourceMappingURL=editmaintitle.module.js.map