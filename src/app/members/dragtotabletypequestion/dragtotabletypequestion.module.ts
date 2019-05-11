import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { DragtotabletypequestionPage } from './dragtotabletypequestion.page';

const routes: Routes = [
  {
    path: '',
    component: DragtotabletypequestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicSelectableModule
  ],
  declarations: [DragtotabletypequestionPage]
})
export class DragtotabletypequestionPageModule {}
