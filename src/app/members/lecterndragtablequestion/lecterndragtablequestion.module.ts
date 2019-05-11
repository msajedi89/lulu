import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecterndragtablequestionPage } from './lecterndragtablequestion.page';

import { DragulaModule } from 'ng2-dragula';

const routes: Routes = [
  {
    path: '',
    component: LecterndragtablequestionPage
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
  declarations: [LecterndragtablequestionPage]
})
export class LecterndragtablequestionPageModule {}
