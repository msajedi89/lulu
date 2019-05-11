import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationofdragtotablequestionPage } from './evaluationofdragtotablequestion.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationofdragtotablequestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationofdragtotablequestionPage]
})
export class EvaluationofdragtotablequestionPageModule {}
