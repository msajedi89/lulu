import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecternquestionspagePage } from './lecternquestionspage.page';

const routes: Routes = [
  {
    path: '',
    component: LecternquestionspagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecternquestionspagePage]
})
export class LecternquestionspagePageModule {}
