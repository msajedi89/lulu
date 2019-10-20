import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { DragdroptypequestionPage } from './dragdroptypequestion.page';
var routes = [
    {
        path: '',
        component: DragdroptypequestionPage
    }
];
var DragdroptypequestionPageModule = /** @class */ (function () {
    function DragdroptypequestionPageModule() {
    }
    DragdroptypequestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [DragdroptypequestionPage]
        })
    ], DragdroptypequestionPageModule);
    return DragdroptypequestionPageModule;
}());
export { DragdroptypequestionPageModule };
//# sourceMappingURL=dragdroptypequestion.module.js.map