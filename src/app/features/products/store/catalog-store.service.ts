import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';
import { CatalogItem } from './CatalogItem';
import { CatalogHttpService } from '../services/catalog-http.service';
@Injectable()
export class CatalogStore {
  //Product Catalog
  private _catalog: BehaviorSubject<List<CatalogItem>> = new BehaviorSubject(List([]));
  public readonly catalog: Observable<List<CatalogItem>> = this._catalog.asObservable();

  //Shopping Cart
  private _basket: BehaviorSubject<List<CatalogItem>> = new BehaviorSubject(List([]));
  public readonly basket: Observable<List<CatalogItem>> = this._basket.asObservable();

  constructor(private catalogHttp:CatalogHttpService) {
    this.getItems();
  }
  removeFromBasket(deleteItem) {
    return new Promise<void>((res,rej) => {
      let collection:List<CatalogItem> = this._basket.getValue();
      let index = collection.findIndex(idx => idx.id === deleteItem.id);
      this._basket.next(collection.delete(index));
      res();
    })
  }
  updateCatalog(item, qty) {
    let catalog:List<CatalogItem> = this._catalog.getValue();
    let index = catalog.findIndex(idx => idx.id === item.id);
    let updateItem:CatalogItem = catalog.get(index);
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
    this._catalog.next(catalog.set(index,record));
  }
  updateBasket(item, qty) {

  }

  addToBasket(item, qty) {
    let basket:List<CatalogItem> = this._basket.getValue();
    let index = basket.findIndex(idx => idx.id === item.id);
    if(index !== -1) {
      qty = +qty + +basket.get(index).quantity;
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
      return this._basket.next(basket.set(item.id, record))
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
      return this._basket.next(List(basket.push(record)));
    }
  }

  updateBasketQty(item, qty) {
    this.removeFromBasket(item)
      .then(() =>this.addToBasket(item, qty));
  }

  clearSubject() {
    this._catalog.complete();
    this._catalog = new BehaviorSubject(List([]));
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
        this._catalog.next(List(items));
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
        this._catalog.next(List(item));
      })
  }
}
