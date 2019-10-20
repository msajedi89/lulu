import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LecterndragdropquestionPage } from './lecterndragdropquestion.page';
import { DragulaModule } from 'ng2-dragula';
var routes = [
    {
        path: '',
        component: LecterndragdropquestionPage
    }
];
var LecterndragdropquestionPageModule = /** @class */ (function () {
    function LecterndragdropquestionPageModule() {
    }
    LecterndragdropquestionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                DragulaModule
            ],
            declarations: [LecterndragdropquestionPage]
        })
    ], LecterndragdropquestionPageModule);
    return LecterndragdropquestionPageModule;
}());
export { LecterndragdropquestionPageModule };
//# sourceMappingURL=lecterndragdropquestion.module.js.map