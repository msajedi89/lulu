import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListofstudentstakenexamPage } from './listofstudentstakenexam.page';
var routes = [
    {
        path: '',
        component: ListofstudentstakenexamPage
    }
];
var ListofstudentstakenexamPageModule = /** @class */ (function () {
    function ListofstudentstakenexamPageModule() {
    }
    ListofstudentstakenexamPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListofstudentstakenexamPage]
        })
    ], ListofstudentstakenexamPageModule);
    return ListofstudentstakenexamPageModule;
}());
export { ListofstudentstakenexamPageModule };
//# sourceMappingURL=listofstudentstakenexam.module.js.map