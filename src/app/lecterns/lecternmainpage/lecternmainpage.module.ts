import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecternmainpagePage } from './lecternmainpage.page';

const routes: Routes = [
  {
    path: '',
    component: LecternmainpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecternmainpagePage]
})
export class LecternmainpagePageModule {}
