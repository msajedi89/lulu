import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { RecitethequranPage } from './recitethequran.page';
var routes = [
    {
        path: '',
        component: RecitethequranPage
    }
];
var RecitethequranPageModule = /** @class */ (function () {
    function RecitethequranPageModule() {
    }
    RecitethequranPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                IonicSelectableModule
            ],
            declarations: [RecitethequranPage]
        })
    ], RecitethequranPageModule);
    return RecitethequranPageModule;
}());
export { RecitethequranPageModule };
//# sourceMappingURL=recitethequran.module.js.map