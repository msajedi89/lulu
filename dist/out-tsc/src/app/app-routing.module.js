import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    {
        path: 'members',
        loadChildren: './members/member-routing.module#MemberRoutingModule'
    },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'parentdash', loadChildren: './parents/parentdash/parentdash.module#ParentdashPageModule' },
    { path: 'addstudent', loadChildren: './parents/addstudent/addstudent.module#AddstudentPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map