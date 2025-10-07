import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideListComponent } from './side-list.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { StoreModule } from '@ngrx/store';
import { sideListReducer } from './side-list.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    StoreModule.forFeature('SideList', sideListReducer)
  ],
  declarations: [SideListComponent],
  exports: [SideListComponent]
})
export class SideListModule { }
