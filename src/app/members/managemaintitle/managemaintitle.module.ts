import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagemaintitlePage } from './managemaintitle.page';

const routes: Routes = [
  {
    path: '',
    component: ManagemaintitlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagemaintitlePage]
})
export class ManagemaintitlePageModule {}
