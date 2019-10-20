import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatreportmaintitlequestionslistPage } from './catreportmaintitlequestionslist.page';

const routes: Routes = [
  {
    path: '',
    component: CatreportmaintitlequestionslistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CatreportmaintitlequestionslistPage]
})
export class CatreportmaintitlequestionslistPageModule {}
