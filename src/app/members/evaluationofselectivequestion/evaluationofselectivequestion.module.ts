import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationofselectivequestionPage } from './evaluationofselectivequestion.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationofselectivequestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationofselectivequestionPage]
})
export class EvaluationofselectivequestionPageModule {}
