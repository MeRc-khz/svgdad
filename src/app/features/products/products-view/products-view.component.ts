import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../store/catalog-store.service';
import { OverlayService } from '../../../components/overlay/services/overlay.service';
import { CatalogItem } from '../store/CatalogItem';
import { SideListService } from '../../../components/side-list/side-list.service';

@Component({
  selector: 'khz-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  public catalog = this.catalogStore.catalog;
  public selectedCategory = signal<string>('ALL');

  // id of the item whose quick-view button is hovered (drives the image overlay tag)
  public quickHoverId = signal<number | null>(null);

  // Track local card quantities
  public itemQuantities = signal<{ [id: number]: number }>({});

  public categories = [
    { id: 'ALL', label: 'ALL GEAR' },
    { id: 'tees', label: 'HEAVYWEIGHT TEES' },
    { id: 'caps', label: 'SNAPBACKS & HATS' },
    { id: 'accessories', label: 'PREPPER & EDC' }
  ];

  public filteredCatalog = computed(() => {
    const cat = this.selectedCategory().toLowerCase();
    const items = this.catalog();

    if (cat === 'all') {
      return items;
    } else if (cat === 'tees') {
      return items.filter(i => i.title.toLowerCase().includes('t') || i.description.toLowerCase().includes('t-shirt') || i.title.toLowerCase().includes('hoodie'));
    } else if (cat === 'caps') {
      return items.filter(i => i.title.toLowerCase().includes('hat') || i.title.toLowerCase().includes('bucket'));
    } else if (cat === 'accessories') {
      return items.filter(i => i.title.toLowerCase().includes('buckle') || i.title.toLowerCase().includes('opener') || (!i.title.toLowerCase().includes('t') && !i.title.toLowerCase().includes('hat')));
    }
    return items;
  });

  // Shipping progress towards $75
  public subtotal = computed(() => {
    return this.catalogStore.basket().reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  });

  public freeShippingThreshold = 75;
  public freeShippingProgress = computed(() => {
    return Math.min(100, Math.round((this.subtotal() / this.freeShippingThreshold) * 100));
  });
  public amountToFreeShipping = computed(() => {
    const diff = this.freeShippingThreshold - this.subtotal();
    return diff > 0 ? diff : 0;
  });

  constructor(
    public overlayService: OverlayService,
    public catalogStore: CatalogStore,
    private sideListService: SideListService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.loadData();
  }

  loadData() {
    this.catalogStore.getItems();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.cat) {
        this.selectedCategory.set(params.cat.toLowerCase());
      }
    });
  }

  selectCategory(catId: string) {
    this.selectedCategory.set(catId);
  }

  getItemQty(item: CatalogItem): number {
    return this.itemQuantities()[item.id] || 1;
  }

  incrementCardQty(item: CatalogItem) {
    const current = this.getItemQty(item);
    this.itemQuantities.update(map => ({
      ...map,
      [item.id]: current + 1
    }));
  }

  decrementCardQty(item: CatalogItem) {
    const current = this.getItemQty(item);
    if (current > 1) {
      this.itemQuantities.update(map => ({
        ...map,
        [item.id]: current - 1
      }));
    }
  }

  add2Basket(item: CatalogItem, qty?: any) {
    const quantity = qty ? parseInt(qty, 10) : this.getItemQty(item);
    this.catalogStore.addToBasket(item, quantity || 1);
    this.sideListService.openDrawer();
  }

  openProduct(item: CatalogItem) {
    this.router.navigate(['/products/item', item.id]);
  }

  previewItem(item: CatalogItem) {
    this.overlayService.activate({
      data: { item },
      state: 'OPEN',
      type: 'previewItem'
    });
  }

  qtyValUpdated(item: CatalogItem, qty: any) {
    this.catalogStore.updateCatalog(item, qty);
  }
}
