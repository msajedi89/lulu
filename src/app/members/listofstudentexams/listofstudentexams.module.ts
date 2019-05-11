import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListofstudentexamsPage } from './listofstudentexams.page';

const routes: Routes = [
  {
    path: '',
    component: ListofstudentexamsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListofstudentexamsPage]
})
export class ListofstudentexamsPageModule {}
