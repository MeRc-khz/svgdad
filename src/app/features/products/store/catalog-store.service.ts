import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CatalogItem } from './CatalogItem';
import { CatalogHttpService } from '../services/catalog-http.service';
@Injectable()
export class CatalogStore {
  //Product Catalog
  private _catalog: BehaviorSubject<CatalogItem[]> = new BehaviorSubject([]);
  public readonly catalog: Observable<CatalogItem[]> = this._catalog.asObservable();

  //Shopping Cart
  private _basket: BehaviorSubject<CatalogItem[]> = new BehaviorSubject([]);
  public readonly basket: Observable<CatalogItem[]> = this._basket.asObservable();

  constructor(private catalogHttp:CatalogHttpService) {
    this.getItems();
  }
  removeFromBasket(deleteItem) {
    return new Promise<void>((res,rej) => {
      let collection:CatalogItem[] = this._basket.getValue();
      let index = collection.findIndex(idx => idx.id === deleteItem.id);
      collection.splice(index, 1);
      this._basket.next(collection);
      res();
    })
  }
  updateCatalog(item, qty) {
    let catalog:CatalogItem[] = this._catalog.getValue();
    let index = catalog.findIndex(idx => idx.id === item.id);
    let updateItem:CatalogItem = catalog[index];
    let record = new CatalogItem({
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
    this._catalog.next(catalog);
  }
  updateBasket(item, qty) {

  }

  addToBasket(item, qty) {
    let basket:CatalogItem[] = this._basket.getValue();
    let index = basket.findIndex(idx => idx.id === item.id);
    if(index !== -1) {
      qty = +qty + +basket[index].quantity;
      let record = new CatalogItem({
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
      return this._basket.next(basket)
    } else {

      let record = new CatalogItem({
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
      return this._basket.next(basket);
    }
  }

  updateBasketQty(item, qty) {
    this.removeFromBasket(item)
      .then(() =>this.addToBasket(item, qty));
  }

  clearSubject() {
    this._catalog.complete();
    this._catalog = new BehaviorSubject([]);
  }

  getItems() {
    this.catalogHttp.getCatalog()
      .subscribe(response => {
        let items = response.map( (catalogItem: any):CatalogItem => {
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
        this._catalog.next(items);
      })
  }
  getItemById(id) {
    this.catalogHttp.getCatalogItem(id)
      .subscribe(response => {
        let item = response.map( (catalogItem: any):CatalogItem => {
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
        this._catalog.next(item);
      })
  }
}