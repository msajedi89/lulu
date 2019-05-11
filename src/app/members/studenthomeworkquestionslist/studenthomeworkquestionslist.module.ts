import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudenthomeworkquestionslistPage } from './studenthomeworkquestionslist.page';

const routes: Routes = [
  {
    path: '',
    component: StudenthomeworkquestionslistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudenthomeworkquestionslistPage]
})
export class StudenthomeworkquestionslistPageModule {}
