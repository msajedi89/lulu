import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentsdragtotablequestionPage } from './studentsdragtotablequestion.page';

import { DragulaModule } from 'ng2-dragula';

const routes: Routes = [
  {
    path: '',
    component: StudentsdragtotablequestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragulaModule
  ],
  declarations: [StudentsdragtotablequestionPage]
})
export class StudentsdragtotablequestionPageModule {}
