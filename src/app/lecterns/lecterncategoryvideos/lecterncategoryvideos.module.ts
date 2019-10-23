import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecterncategoryvideosPage } from './lecterncategoryvideos.page';

const routes: Routes = [
  {
    path: '',
    component: LecterncategoryvideosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LecterncategoryvideosPage]
})
export class LecterncategoryvideosPageModule {}
