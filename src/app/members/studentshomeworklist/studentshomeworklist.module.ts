import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentshomeworklistPage } from './studentshomeworklist.page';

const routes: Routes = [
  {
    path: '',
    component: StudentshomeworklistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentshomeworklistPage]
})
export class StudentshomeworklistPageModule {}
