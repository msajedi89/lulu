import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { EditsubtitlePage } from './editsubtitle.page';
var routes = [
    {
        path: '',
        component: EditsubtitlePage
    }
];
var EditsubtitlePageModule = /** @class */ (function () {
    function EditsubtitlePageModule() {
    }
    EditsubtitlePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [EditsubtitlePage]
        })
    ], EditsubtitlePageModule);
    return EditsubtitlePageModule;
}());
export { EditsubtitlePageModule };
//# sourceMappingURL=editsubtitle.module.js.map