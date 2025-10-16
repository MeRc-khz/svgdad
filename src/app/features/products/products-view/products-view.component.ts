import { Component, OnInit } from '@angular/core';
import { CatalogStore } from '../store/catalog-store.service';
import { OverlayService } from '../../../components/overlay/services/overlay.service';
import { FormControl } from '@angular/forms';
import { CatalogItem } from '../store/CatalogItem';

@Component({
  selector: 'khz-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  public catalog = this.catalogStore.catalog;

  constructor(public overlayService:OverlayService, public catalogStore:CatalogStore) { 
    this.loadData();
  }
  loadData() {
    this.catalogStore.getItems();
  }
  add2Basket(item, qty) {
    this.catalogStore.addToBasket(item, qty);
  }
  ngOnInit() {
  }

  previewItem(item) {
    console.log(item);
    this.overlayService.activate({data:{item}, state:'OPEN', type:'previewItem'});
  }
  qtyValUpdated(item,qty) {
    this.catalogStore.updateCatalog(item, qty);
  }
}
