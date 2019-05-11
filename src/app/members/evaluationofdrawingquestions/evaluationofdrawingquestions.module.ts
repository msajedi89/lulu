import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationofdrawingquestionsPage } from './evaluationofdrawingquestions.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationofdrawingquestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationofdrawingquestionsPage]
})
export class EvaluationofdrawingquestionsPageModule {}
