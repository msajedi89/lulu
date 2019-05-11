import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecternmaintitlepagePage } from './lecternmaintitlepage.page';

const routes: Routes = [
  {
    path: '',
    component: LecternmaintitlepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecternmaintitlepagePage]
})
export class LecternmaintitlepagePageModule {}
