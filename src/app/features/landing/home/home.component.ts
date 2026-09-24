import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogStore } from '../../products/store/catalog-store.service';
import { CatalogItem } from '../../products/store/CatalogItem';
import { SideListService } from '../../../components/side-list/side-list.service';
import { OverlayService } from '../../../components/overlay/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // id of the item whose quick-view button is hovered (drives the image overlay tag)
  public quickHoverId = signal<number | null>(null);
  public catalog = this.catalogStore.catalog;

  public featuredItems = computed(() => {
    return this.catalog().slice(0, 4);
  });

  public emailInput: string = '';
  public vipSubscribed = signal<boolean>(false);
  public vipError = signal<string>('');

  constructor(
    public catalogStore: CatalogStore,
    private sideListService: SideListService,
    public overlayService: OverlayService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.catalog().length === 0) {
      this.catalogStore.getItems();
    }
  }

  addToBag(item: CatalogItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.catalogStore.addToBasket(item, 1);
    this.sideListService.openDrawer();
  }

  openProduct(item: CatalogItem) {
    this.router.navigate(['/products/item', item.id]);
  }

  quickView(item: CatalogItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.overlayService.activate({
      data: { item },
      state: 'OPEN',
      type: 'previewItem'
    });
  }

  navigateToDrop(category?: string) {
    if (category) {
      this.router.navigate(['/products'], { queryParams: { cat: category } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  joinVip() {
    const email = this.emailInput.trim();
    this.vipError.set('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      this.vipError.set('Whoa, check that email again, pops. Enter a valid address.');
      return;
    }

    this.vipSubscribed.set(true);
    this.emailInput = '';
  }
}
