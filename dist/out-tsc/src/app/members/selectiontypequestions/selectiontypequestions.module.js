import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { SelectiontypequestionsPage } from './selectiontypequestions.page';
var routes = [
    {
        path: '',
        component: SelectiontypequestionsPage
    }
];
var SelectiontypequestionsPageModule = /** @class */ (function () {
    function SelectiontypequestionsPageModule() {
    }
    SelectiontypequestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [SelectiontypequestionsPage]
        })
    ], SelectiontypequestionsPageModule);
    return SelectiontypequestionsPageModule;
}());
export { SelectiontypequestionsPageModule };
//# sourceMappingURL=selectiontypequestions.module.js.map