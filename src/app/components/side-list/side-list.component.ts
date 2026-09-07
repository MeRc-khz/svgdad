import { Component, computed } from '@angular/core';
import { animate, state, trigger, style, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { SideListService } from './side-list.service';
import { CatalogStore } from '../../features/products/store/catalog-store.service';
import { CatalogItem } from '../../features/products/store/CatalogItem';

@Component({
  selector: 'khz-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
  animations: [
    trigger('sideListState', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('close', style({
        transform: 'translateX(100%)'
      })),
      transition('close => open', animate('280ms cubic-bezier(0.16, 1, 0.3, 1)')),
      transition('open => close', animate('200ms cubic-bezier(0.7, 0, 0.84, 0)'))
    ]),
    trigger('backdropState', [
      state('open', style({
        opacity: 1,
        pointerEvents: 'auto'
      })),
      state('close', style({
        opacity: 0,
        pointerEvents: 'none'
      })),
      transition('close <=> open', animate('250ms ease'))
    ])
  ]
})
export class SideListComponent {
  public isOpen = computed(() => this.sideListService.getShowDrawer()());
  public sideListState = computed(() => this.isOpen() ? 'open' : 'close');

  public basket = this.catalogStore.basket;

  public itemCount = computed(() => {
    return this.basket().reduce((acc, item) => acc + (item.quantity || 1), 0);
  });

  public subtotal = computed(() => {
    return this.basket().reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  });

  public freeShippingThreshold = 75;

  public freeShippingProgress = computed(() => {
    const total = this.subtotal();
    return Math.min(100, Math.round((total / this.freeShippingThreshold) * 100));
  });

  public amountToFreeShipping = computed(() => {
    const diff = this.freeShippingThreshold - this.subtotal();
    return diff > 0 ? diff : 0;
  });

  constructor(
    private sideListService: SideListService,
    private catalogStore: CatalogStore,
    private router: Router
  ) {}

  close() {
    this.sideListService.closeDrawer();
  }

  increment(item: CatalogItem) {
    this.catalogStore.updateBasketQty(item, (item.quantity || 1) + 1);
  }

  decrement(item: CatalogItem) {
    this.catalogStore.updateBasketQty(item, (item.quantity || 1) - 1);
  }

  removeItem(item: CatalogItem) {
    this.catalogStore.removeFromBasket(item);
  }

  goToCart() {
    this.close();
    this.router.navigate(['/products/cart']);
  }

  goToProducts() {
    this.close();
    this.router.navigate(['/products']);
  }
}
