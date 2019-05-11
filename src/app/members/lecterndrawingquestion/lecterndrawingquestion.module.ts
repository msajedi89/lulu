import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecterndrawingquestionPage } from './lecterndrawingquestion.page';

const routes: Routes = [
  {
    path: '',
    component: LecterndrawingquestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecterndrawingquestionPage]
})
export class LecterndrawingquestionPageModule {}
