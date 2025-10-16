import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideListComponent } from './side-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [SideListComponent],
  exports: [SideListComponent]
})
export class SideListModule { }
