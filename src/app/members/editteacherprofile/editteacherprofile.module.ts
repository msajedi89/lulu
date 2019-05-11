import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditteacherprofilePage } from './editteacherprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditteacherprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditteacherprofilePage]
})
export class EditteacherprofilePageModule {}
