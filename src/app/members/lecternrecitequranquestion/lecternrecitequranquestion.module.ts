import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecternrecitequranquestionPage } from './lecternrecitequranquestion.page';

const routes: Routes = [
  {
    path: '',
    component: LecternrecitequranquestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecternrecitequranquestionPage]
})
export class LecternrecitequranquestionPageModule {}
