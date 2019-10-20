import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudentselectivequestionsPage } from './studentselectivequestions.page';
var routes = [
    {
        path: '',
        component: StudentselectivequestionsPage
    }
];
var StudentselectivequestionsPageModule = /** @class */ (function () {
    function StudentselectivequestionsPageModule() {
    }
    StudentselectivequestionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudentselectivequestionsPage]
        })
    ], StudentselectivequestionsPageModule);
    return StudentselectivequestionsPageModule;
}());
export { StudentselectivequestionsPageModule };
//# sourceMappingURL=studentselectivequestions.module.js.map