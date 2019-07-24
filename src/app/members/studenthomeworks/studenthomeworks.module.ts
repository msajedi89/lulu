import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudenthomeworksPage } from './studenthomeworks.page';

const routes: Routes = [
  {
    path: '',
    component: StudenthomeworksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudenthomeworksPage]
})
export class StudenthomeworksPageModule {}
