import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudenttakenexamquestionlistPage } from './studenttakenexamquestionlist.page';
var routes = [
    {
        path: '',
        component: StudenttakenexamquestionlistPage
    }
];
var StudenttakenexamquestionlistPageModule = /** @class */ (function () {
    function StudenttakenexamquestionlistPageModule() {
    }
    StudenttakenexamquestionlistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudenttakenexamquestionlistPage]
        })
    ], StudenttakenexamquestionlistPageModule);
    return StudenttakenexamquestionlistPageModule;
}());
export { StudenttakenexamquestionlistPageModule };
//# sourceMappingURL=studenttakenexamquestionlist.module.js.map