import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllstudentsforreportsPage } from './allstudentsforreports.page';

const routes: Routes = [
  {
    path: '',
    component: AllstudentsforreportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllstudentsforreportsPage]
})
export class AllstudentsforreportsPageModule {}
