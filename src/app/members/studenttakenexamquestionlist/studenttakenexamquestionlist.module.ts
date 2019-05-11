import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudenttakenexamquestionlistPage } from './studenttakenexamquestionlist.page';

const routes: Routes = [
  {
    path: '',
    component: StudenttakenexamquestionlistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudenttakenexamquestionlistPage]
})
export class StudenttakenexamquestionlistPageModule {}
