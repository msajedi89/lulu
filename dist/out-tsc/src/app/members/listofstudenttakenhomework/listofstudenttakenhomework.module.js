import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListofstudenttakenhomeworkPage } from './listofstudenttakenhomework.page';
var routes = [
    {
        path: '',
        component: ListofstudenttakenhomeworkPage
    }
];
var ListofstudenttakenhomeworkPageModule = /** @class */ (function () {
    function ListofstudenttakenhomeworkPageModule() {
    }
    ListofstudenttakenhomeworkPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListofstudenttakenhomeworkPage]
        })
    ], ListofstudenttakenhomeworkPageModule);
    return ListofstudenttakenhomeworkPageModule;
}());
export { ListofstudenttakenhomeworkPageModule };
//# sourceMappingURL=listofstudenttakenhomework.module.js.map