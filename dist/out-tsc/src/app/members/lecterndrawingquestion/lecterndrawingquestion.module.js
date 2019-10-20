import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecterndrawingquestionPage } from './lecterndrawingquestion.page';
var routes = [
    {
        path: '',
        component: LecterndrawingquestionPage
    }
];
var LecterndrawingquestionPageModule = /** @class */ (function () {
    function LecterndrawingquestionPageModule() {
    }
    LecterndrawingquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LecterndrawingquestionPage]
        })
    ], LecterndrawingquestionPageModule);
    return LecterndrawingquestionPageModule;
}());
export { LecterndrawingquestionPageModule };
//# sourceMappingURL=lecterndrawingquestion.module.js.map