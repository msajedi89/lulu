import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';

import { IonicModule } from '@ionic/angular';

import { StudentdragdropquestionPage } from './studentdragdropquestion.page';

const routes: Routes = [
  {
    path: '',
    component: StudentdragdropquestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule
  ],
  declarations: [StudentdragdropquestionPage]
})
export class StudentdragdropquestionPageModule {}
