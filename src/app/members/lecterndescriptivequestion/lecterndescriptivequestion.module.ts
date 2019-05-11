import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecterndescriptivequestionPage } from './lecterndescriptivequestion.page';

const routes: Routes = [
  {
    path: '',
    component: LecterndescriptivequestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecterndescriptivequestionPage]
})
export class LecterndescriptivequestionPageModule {}
