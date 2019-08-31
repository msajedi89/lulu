import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReportexamprogressPage } from './reportexamprogress.page';

const routes: Routes = [
  {
    path: '',
    component: ReportexamprogressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportexamprogressPage]
})
export class ReportexamprogressPageModule {}
