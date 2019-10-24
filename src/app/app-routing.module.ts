import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'members',
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'parentdash', loadChildren: './parents/parentdash/parentdash.module#ParentdashPageModule' },
  { path: 'addstudent', loadChildren: './parents/addstudent/addstudent.module#AddstudentPageModule' },
  { path: 'categoryreportmaintitlespage', loadChildren: './reports/categoryreportmaintitlespage/categoryreportmaintitlespage.module#CategoryreportmaintitlespagePageModule' },
  { path: 'catreportmaintitlequestionslist', loadChildren: './reports/catreportmaintitlequestionslist/catreportmaintitlequestionslist.module#CatreportmaintitlequestionslistPageModule' },
  { path: 'viewstudents', loadChildren: './parents/viewstudents/viewstudents.module#ViewstudentsPageModule' },
  { path: 'lecternmainpage', loadChildren: './lecterns/lecternmainpage/lecternmainpage.module#LecternmainpagePageModule' },
  { path: 'managecategories', loadChildren: './lecterns/managecategories/managecategories.module#ManagecategoriesPageModule' },
  { path: 'editcategory', loadChildren: './lecterns/editcategory/editcategory.module#EditcategoryPageModule' },
  { path: 'uploadlecternvideo', loadChildren: './lecterns/uploadlecternvideo/uploadlecternvideo.module#UploadlecternvideoPageModule' },  { path: 'uploadvideo', loadChildren: './lecterns/uploadvideo/uploadvideo.module#UploadvideoPageModule' },
  { path: 'lecterncategories', loadChildren: './lecterns/lecterncategories/lecterncategories.module#LecterncategoriesPageModule' },
  { path: 'lecterncategoryvideos', loadChildren: './lecterns/lecterncategoryvideos/lecterncategoryvideos.module#LecterncategoryvideosPageModule' },
  { path: 'addvideoquestions', loadChildren: './lecterns/addvideoquestions/addvideoquestions.module#AddvideoquestionsPageModule' },
  { path: 'studentwatchvideo', loadChildren: './lecterns/studentwatchvideo/studentwatchvideo.module#StudentwatchvideoPageModule' },
  { path: 'studenttakelecternexam', loadChildren: './lecterns/studenttakelecternexam/studenttakelecternexam.module#StudenttakelecternexamPageModule' },
  { path: 'manageparents', loadChildren: './parents/manageparents/manageparents.module#ManageparentsPageModule' },
  { path: 'addoreditparent', loadChildren: './parents/addoreditparent/addoreditparent.module#AddoreditparentPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
