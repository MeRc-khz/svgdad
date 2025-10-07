//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//material
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
import { CatalogStore } from '../../features/products/store/catalog-store.service';
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
    HttpClientModule,
    ProductsModule
  ],
  providers: [CatalogStore, ModalNetService, OverlayService],
  declarations:[ NotifierComponent, ToasterComponent, FootswitchComponent, ModalComponent, OverlayComponent, HostDirective],
  exports:[OverlayComponent],
  entryComponents:[ItemViewComponent, ModalComponent]
})

export class OverlayModule { }
