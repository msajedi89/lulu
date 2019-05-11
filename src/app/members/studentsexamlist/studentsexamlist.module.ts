import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentsexamlistPage } from './studentsexamlist.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsexamlistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentsexamlistPage]
})
export class StudentsexamlistPageModule {}
