import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagesubtitlePage } from './managesubtitle.page';

const routes: Routes = [
  {
    path: '',
    component: ManagesubtitlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagesubtitlePage]
})
export class ManagesubtitlePageModule {}
