import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddoreditparentPage } from './addoreditparent.page';

const routes: Routes = [
  {
    path: '',
    component: AddoreditparentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddoreditparentPage]
})
export class AddoreditparentPageModule {}
