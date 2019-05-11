import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeworkevaluationPage } from './homeworkevaluation.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkevaluationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeworkevaluationPage]
})
export class HomeworkevaluationPageModule {}
