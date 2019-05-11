import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationofdragdropquestionsPage } from './evaluationofdragdropquestions.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationofdragdropquestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationofdragdropquestionsPage]
})
export class EvaluationofdragdropquestionsPageModule {}
