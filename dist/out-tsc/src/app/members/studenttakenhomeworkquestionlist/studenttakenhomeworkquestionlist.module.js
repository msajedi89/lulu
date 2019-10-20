import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StudenttakenhomeworkquestionlistPage } from './studenttakenhomeworkquestionlist.page';
var routes = [
    {
        path: '',
        component: StudenttakenhomeworkquestionlistPage
    }
];
var StudenttakenhomeworkquestionlistPageModule = /** @class */ (function () {
    function StudenttakenhomeworkquestionlistPageModule() {
    }
    StudenttakenhomeworkquestionlistPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [StudenttakenhomeworkquestionlistPage]
        })
    ], StudenttakenhomeworkquestionlistPageModule);
    return StudenttakenhomeworkquestionlistPageModule;
}());
export { StudenttakenhomeworkquestionlistPageModule };
//# sourceMappingURL=studenttakenhomeworkquestionlist.module.js.map