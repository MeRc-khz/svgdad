import { Injectable, signal } from '@angular/core';
import { CatalogItem } from './CatalogItem';
import { CatalogHttpService } from '../services/catalog-http.service';
@Injectable()
export class CatalogStore {
  //Product Catalog
  private _catalog = signal<CatalogItem[]>([]);
  public readonly catalog = this._catalog.asReadonly();

  //Shopping Cart
  private _basket = signal<CatalogItem[]>([]);
  public readonly basket = this._basket.asReadonly();

  constructor(private catalogHttp:CatalogHttpService) {
    this.getItems();
  }
  removeFromBasket(deleteItem) {
    this._basket.update(collection => {
      const index = collection.findIndex(idx => idx.id === deleteItem.id);
      if (index !== -1) {
        collection.splice(index, 1);
      }
      return collection;
    });
  }
  updateCatalog(item, qty) {
    this._catalog.update(catalog => {
      const index = catalog.findIndex(idx => idx.id === item.id);
      if (index !== -1) {
        const record = new CatalogItem({
          id: item.id,
          imgUri: item.imgUri,
          price: item.price,
          description: item.description,
          title: item.title,
          fit: item.fit,
          ordered: item.ordered,
          quantity: qty
        });
        catalog[index] = record;
      }
      return catalog;
    });
  }
  updateBasket(item, qty) {

  }

  addToBasket(item, qty) {
    this._basket.update(basket => {
      const index = basket.findIndex(idx => idx.id === item.id);
      if(index !== -1) {
        qty = +qty + +basket[index].quantity;
        const record = new CatalogItem({
          id: item.id,
          imgUri: item.imgUri,
          price: item.price,
          description: item.description,
          title: item.title,
          fit: item.fit,
          ordered: true,
          quantity: qty
        });
        basket[index] = record;
      } else {
        const record = new CatalogItem({
          id: item.id,
          imgUri: item.imgUri,
          price: item.price,
          description: item.description,
          title: item.title,
          fit: item.fit,
          ordered: true,
          quantity: qty
        });
        basket.push(record);
      }
      return basket;
    });
  }

  updateBasketQty(item, qty) {
    this.removeFromBasket(item);
    this.addToBasket(item, qty);
  }

  getItems() {
    this.catalogHttp.getCatalog()
      .subscribe(response => {
        const items = response.map( (catalogItem: any):CatalogItem => {
          return new CatalogItem({
            id: catalogItem.id,
            imgUri: catalogItem.imgUri,
            price: catalogItem.price,
            fit: catalogItem.fit,
            description: catalogItem.description,
            title: catalogItem.title,
            ordered: catalogItem.ordered,
            quantity: catalogItem.quantity
          });
        });
        this._catalog.set(items);
      })
  }
  getItemById(id) {
    this.catalogHttp.getCatalogItem(id)
      .subscribe(response => {
        const item = response.map( (catalogItem: any):CatalogItem => {
          return new CatalogItem({
            id: catalogItem.id,
            imgUri: catalogItem.imgUri,
            price: catalogItem.price,
            fit: catalogItem.fit,
            description: catalogItem.description,
            title: catalogItem.title,
            ordered: catalogItem.ordered,
            quantity: catalogItem.quantity
          });
        });
        this._catalog.set(item);

      })
  }
}