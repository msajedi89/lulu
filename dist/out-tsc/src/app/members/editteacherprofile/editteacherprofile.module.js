import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditteacherprofilePage } from './editteacherprofile.page';
var routes = [
    {
        path: '',
        component: EditteacherprofilePage
    }
];
var EditteacherprofilePageModule = /** @class */ (function () {
    function EditteacherprofilePageModule() {
    }
    EditteacherprofilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditteacherprofilePage]
        })
    ], EditteacherprofilePageModule);
    return EditteacherprofilePageModule;
}());
export { EditteacherprofilePageModule };
//# sourceMappingURL=editteacherprofile.module.js.map