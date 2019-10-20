import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryreportmaintitlespagePage } from './categoryreportmaintitlespage.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryreportmaintitlespagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryreportmaintitlespagePage]
})
export class CategoryreportmaintitlespagePageModule {}
