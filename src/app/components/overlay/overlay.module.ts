//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

//components
import { ToasterComponent } from './toaster/toaster.component';
import { ModalComponent } from './modal/modal.component';
import { NotifierComponent } from './notifier/notifier.component';
// import { SplashComponent } from './splash/splash.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { FootswitchComponent } from './footswitch/footswitch.component';
import { ItemViewComponent } from '../../features/products/item-view/item-view.component';
//directive
import { HostDirective } from './host/host.directive';

//service
import { OverlayService } from './services/overlay.service';
import { ModalNetService } from './modal/services/modal-net.service';
//modules
import { ProductsModule } from '../../features/products/products.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    ProductsModule
  ],
  providers: [ModalNetService, OverlayService],
  declarations:[ NotifierComponent, ToasterComponent, FootswitchComponent, ModalComponent, OverlayComponent, HostDirective],
  exports:[OverlayComponent]
})

export class OverlayModule { }
