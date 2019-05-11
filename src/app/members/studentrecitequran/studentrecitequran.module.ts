import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentrecitequranPage } from './studentrecitequran.page';

const routes: Routes = [
  {
    path: '',
    component: StudentrecitequranPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentrecitequranPage]
})
export class StudentrecitequranPageModule {}
