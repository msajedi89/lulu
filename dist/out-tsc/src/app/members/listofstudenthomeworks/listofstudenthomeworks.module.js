import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListofstudenthomeworksPage } from './listofstudenthomeworks.page';
var routes = [
    {
        path: '',
        component: ListofstudenthomeworksPage
    }
];
var ListofstudenthomeworksPageModule = /** @class */ (function () {
    function ListofstudenthomeworksPageModule() {
    }
    ListofstudenthomeworksPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListofstudenthomeworksPage]
        })
    ], ListofstudenthomeworksPageModule);
    return ListofstudenthomeworksPageModule;
}());
export { ListofstudenthomeworksPageModule };
//# sourceMappingURL=listofstudenthomeworks.module.js.map