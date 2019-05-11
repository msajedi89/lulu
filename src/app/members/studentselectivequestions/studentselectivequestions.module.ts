import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentselectivequestionsPage } from './studentselectivequestions.page';

const routes: Routes = [
  {
    path: '',
    component: StudentselectivequestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentselectivequestionsPage]
})
export class StudentselectivequestionsPageModule {}
