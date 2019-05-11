import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentdrawingquestionPage } from './studentdrawingquestion.page';

const routes: Routes = [
  {
    path: '',
    component: StudentdrawingquestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentdrawingquestionPage]
})
export class StudentdrawingquestionPageModule {}
