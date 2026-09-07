import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './home/home.component';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { LandingRoutingModule } from './landing-routing.module';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    LandingRoutingModule
  ],
  declarations: [HomeComponent, LandingContainerComponent, CarouselComponent]
})
export class LandingModule { }
