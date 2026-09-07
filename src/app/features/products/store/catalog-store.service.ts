import { Injectable, signal, effect } from '@angular/core';
import { CatalogItem } from './CatalogItem';
import { CatalogHttpService } from '../services/catalog-http.service';

function loadBasketFromStorage(): CatalogItem[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('svgdad_basket');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(item => new CatalogItem(item));
        }
      }
    }
  } catch (e) {
    console.warn('Could not load basket from localStorage:', e);
  }
  return [];
}

function saveBasketToStorage(items: CatalogItem[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('svgdad_basket', JSON.stringify(items));
    }
  } catch (e) {
    console.warn('Could not save basket to localStorage:', e);
  }
}

@Injectable({ providedIn: "root" })
export class CatalogStore {
  //Product Catalog
  private _catalog = signal<CatalogItem[]>([]);
  public readonly catalog = this._catalog.asReadonly();

  //Shopping Cart
  private _basket = signal<CatalogItem[]>(loadBasketFromStorage());
  public readonly basket = this._basket.asReadonly();

  constructor(private catalogHttp:CatalogHttpService) {
    this.getItems();
    effect(() => {
      saveBasketToStorage(this._basket());
    });
  }
  removeFromBasket(deleteItem) {
    this._basket.update(collection => {
      return collection.filter(item => item.id !== deleteItem.id);
    });
  }
  updateCatalog(item, qty) {
    const numQty = parseInt(qty, 10) > 0 ? parseInt(qty, 10) : 1;
    this._catalog.update(catalog => {
      return catalog.map(cItem => {
        if (cItem.id === item.id) {
          return new CatalogItem({
            ...cItem,
            quantity: numQty
          });
        }
        return cItem;
      });
    });
  }
  updateBasket(item, qty) {

  }

  addToBasket(item, qty) {
    const parsed = parseInt(qty, 10);
    const numQty = (!isNaN(parsed) && parsed > 0) ? parsed : 1;
    this._basket.update(basket => {
      const index = basket.findIndex(idx => idx.id === item.id);
      if (index !== -1) {
        const existing = basket[index];
        const updatedQty = (+existing.quantity || 1) + numQty;
        const updatedRecord = new CatalogItem({
          id: existing.id,
          imgUri: existing.imgUri || item.imgUri,
          price: existing.price,
          description: existing.description,
          title: existing.title,
          fit: existing.fit,
          ordered: true,
          quantity: updatedQty
        });
        const next = [...basket];
        next[index] = updatedRecord;
        return next;
      } else {
        const newRecord = new CatalogItem({
          id: item.id,
          imgUri: item.imgUri,
          price: item.price,
          description: item.description,
          title: item.title,
          fit: item.fit,
          ordered: true,
          quantity: numQty
        });
        return [...basket, newRecord];
      }
    });
  }

  updateBasketQty(item, qty) {
    const numQty = parseInt(qty, 10);
    if (isNaN(numQty) || numQty <= 0) {
      this.removeFromBasket(item);
      return;
    }
    this._basket.update(basket => {
      const index = basket.findIndex(idx => idx.id === item.id);
      if (index !== -1) {
        const next = [...basket];
        next[index] = new CatalogItem({
          ...basket[index],
          quantity: numQty
        });
        return next;
      }
      return basket;
    });
  }

  clearBasket() {
    this._basket.set([]);
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