import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluationofdescriptivequestionsPage } from './evaluationofdescriptivequestions.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationofdescriptivequestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluationofdescriptivequestionsPage]
})
export class EvaluationofdescriptivequestionsPageModule {}
