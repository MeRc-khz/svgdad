import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogStore } from '../store/catalog-store.service';
import { ModalNetService } from '../../../components/overlay/modal/services/modal-net.service';
import { SideListService } from '../../../components/side-list/side-list.service';

@Component({
  selector: 'khz-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  public item: any;

  // Quick-view size selection: ADD TO BAG is blocked until a size is picked
  public selectedSize = signal<string>('');
  public sizeError = signal<boolean>(false);

  public sizes = computed<string[]>(() => {
    const it = this.item ? this.item() : null;
    if (!it) return [];
    const fit: any = (it as any).fit;
    if (Array.isArray(fit) && fit.length) {
      return fit.map((f: any) => String(f));
    }
    return ['S', 'M', 'L', 'XL', '2XL'];
  });

  selectSize(event: any) {
    const val = event.target ? event.target.value : event;
    this.selectedSize.set(val || '');
    this.sizeError.set(false);
  }

  sizeLabel(s: string): string {
    const map: any = {
      'small': 'S', 'medium': 'M', 'large': 'L',
      'x-large': 'XL', 'xx-large': '2XL'
    };
    return map[s] ? map[s] : s.toUpperCase();
  }

  constructor(
    public modalNetService: ModalNetService,
    public route: ActivatedRoute,
    public catalogStore: CatalogStore,
    private sideListService: SideListService
  ) {}

  ngOnInit() {
    let pId: number;
    if (this['data'] && this['data'].item) {
      pId = this['data'].item.id;
    } else {
      pId = +this.route.snapshot.params.pId;
    }
    this.loadData(pId);
  }

  loadData(pId) {
    let storeView = 'catalog';
    if (this['data'] && this['data'].item && this['data'].item.ordered) {
      storeView = 'basket';
    }
    this.item = computed(() => {
      const catalog = this.catalogStore[storeView]();
      return catalog.find(item => item.id === pId);
    });
  }

  add2Basket(item) {
    if (!this.selectedSize()) {
      this.sizeError.set(true);
      return;
    }
    const sized = Object.assign(Object.create(Object.getPrototypeOf(item)), item, {
      size: this.sizeLabel(this.selectedSize())
    });
    this.catalogStore.addToBasket(sized, 1);
    this.closeModal();
    this.sideListService.openDrawer();
  }

  closeModal() {
    this.modalNetService.sendCloseModal({type: 'CLOSE_MODAL'});
  }
}
