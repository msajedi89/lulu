import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditmaintitlePage } from './editmaintitle.page';

const routes: Routes = [
  {
    path: '',
    component: EditmaintitlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditmaintitlePage]
})
export class EditmaintitlePageModule {}
