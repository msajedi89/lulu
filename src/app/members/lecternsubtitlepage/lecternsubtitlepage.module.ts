import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecternsubtitlepagePage } from './lecternsubtitlepage.page';

const routes: Routes = [
  {
    path: '',
    component: LecternsubtitlepagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecternsubtitlepagePage]
})
export class LecternsubtitlepagePageModule {}
