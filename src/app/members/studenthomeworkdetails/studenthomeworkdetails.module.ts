import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudenthomeworkdetailsPage } from './studenthomeworkdetails.page';

const routes: Routes = [
  {
    path: '',
    component: StudenthomeworkdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudenthomeworkdetailsPage]
})
export class StudenthomeworkdetailsPageModule {}
