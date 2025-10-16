import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//Modules
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
//Components
import { ProductsContainerComponent } from './products-container/products-container.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';

//service
import { CatalogHttpService } from './services/catalog-http.service';
import { PaymentsService } from './services/payments.service';
//load DI service on rootmodule
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [PaymentsService, CatalogHttpService],
  declarations: [ProductsContainerComponent, ProductsViewComponent, ItemViewComponent, CartViewComponent]
})
export class ProductsModule { }
