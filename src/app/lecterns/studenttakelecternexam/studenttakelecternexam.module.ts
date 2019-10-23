import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudenttakelecternexamPage } from './studenttakelecternexam.page';

const routes: Routes = [
  {
    path: '',
    component: StudenttakelecternexamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudenttakelecternexamPage]
})
export class StudenttakelecternexamPageModule {}
