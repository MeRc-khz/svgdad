import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogStore } from '../store/catalog-store.service';
import { CatalogItem } from '../store/CatalogItem';
import { SideListService } from '../../../components/side-list/side-list.service';

interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

@Component({
  selector: 'khz-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public item = computed<CatalogItem | null>(() => {
    const pId = this.productId();
    const catalog = this.catalogStore.catalog();
    return catalog.find(item => item.id === pId) || null;
  });

  public productId = signal<number>(0);
  public selectedImage = signal<number>(0);
  public selectedSize = signal<string>('');
  public selectedQty = signal<number>(1);
  public notFound = signal<boolean>(false);

  public images = computed<string[]>(() => {
    const it = this.item();
    if (!it) return [];
    const list: string[] = [];
    if ((it as any).images && (it as any).images.length) {
      for (const u of (it as any).images) {
        if (u && !list.includes(u)) list.push(u);
      }
    }
    if (it.imgUri && !list.includes(it.imgUri)) list.unshift(it.imgUri);
    if ((it as any).imgUriAlt && !list.includes((it as any).imgUriAlt)) list.push((it as any).imgUriAlt);
    return list.length ? list : ['assets/images/painteddogs.png'];
  });

  public rating = computed<number>(() => this.reviewStats().avg);
  public reviewStats = computed<{ avg: number; count: number }>(() => {
    const reviews = this.reviews();
    if (!reviews.length) return { avg: 0, count: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return { avg: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length };
  });

  public reviews = signal<Review[]>([]);

  public sizes = computed<string[]>(() => {
    const it = this.item();
    if (!it) return [];
    const fit: any = (it as any).fit;
    if (Array.isArray(fit) && fit.length) {
      // could be ['small','medium'] or ['S','M']
      return fit.map((f: any) => String(f));
    }
    return ['S', 'M', 'L', 'XL', '2XL'];
  });

  constructor(
    public catalogStore: CatalogStore,
    private route: ActivatedRoute,
    private router: Router,
    private sideListService: SideListService
  ) {}

  ngOnInit() {
    this.catalogStore.getItems();
    this.route.params.subscribe(params => {
      const pId = +params.pId;
      this.productId.set(isNaN(pId) ? 0 : pId);
      this.selectedImage.set(0);
      this.selectedQty.set(1);
      const defaultSize = this.sizes()[Math.min(1, Math.max(0, this.sizes().length - 1))];
      this.selectedSize.set(defaultSize || '');
      this.generateReviews();
      // Flag missing product only after catalog had a chance to load
      setTimeout(() => {
        if (!this.item()) this.notFound.set(true);
      }, 1500);
    });
  }

  selectImage(idx: number) {
    this.selectedImage.set(idx);
  }

  selectSize(size: string) {
    this.selectedSize.set(size);
  }

  incrementQty() {
    this.selectedQty.update(q => Math.min(10, q + 1));
  }

  decrementQty() {
    this.selectedQty.update(q => Math.max(1, q - 1));
  }

  addToBag() {
    const it = this.item();
    if (!it) return;
    const sized: any = {
      ...it,
      id: it.id,
      size: this.selectedSize() || undefined
    };
    this.catalogStore.addToBasket(sized, this.selectedQty());
    this.sideListService.openDrawer();
  }

  buyNow() {
    const it = this.item();
    if (!it) return;
    this.addToBag();
    this.router.navigate(['/products/cart']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  starsArray(rating: number): number[] {
    return [1, 2, 3, 4, 5].map(i => (rating >= i ? 1 : (rating >= i - 0.5 ? 0.5 : 0)));
  }

  /**
   * Deterministic seeded reviews — stable per product id so the page always
   * shows the same set. Replace with a real reviews API when ready.
   */
  private generateReviews() {
    const pId = this.productId();
    const seed = 1337 + pId * 17;
    const authors = ['Marcus D.', 'Tyrone J.', 'Dre W.', 'K. Slaughter', 'Big Ray', 'Jasmine C.', 'O.G. Petey', 'Vince H.'];
    const titles = [
      'Heavyweight heat', 'That print is crisp', 'Street certified', 'Worth every dollar',
      'My new favorite tee', 'Quality is serious', 'Get you one', 'Survived the wash — still clean'
    ];
    const bodies = [
      'Fabric is thick, print came out sharp. Fits true to size and the streets noticed.',
      'Shipping was fast and the tee is heavy — not that thin mall stuff. Secured the bag on this one.',
      'Scan the QR code, it actually works. Fit is boxy the right way. Ordering another.',
      'Wore it to the function, three people asked where I got it. That is the review.',
      'Washed it twice already, no fading, no cracking on the print. Build quality is legit.',
      'Cotton is soft but structured. Shoulders sit right. Savage Dad does not miss.'
    ];
    const count = 4 + (seed % 3); // 4-6 reviews
    const list: Review[] = [];
    for (let i = 0; i < count; i++) {
      const r = (seed + i * 13) % 5;
      const rating = r < 1 ? 4 : r; // bias high, never below 4 unless seeded
      list.push({
        author: authors[(seed + i * 7) % authors.length],
        rating: Math.max(4, rating),
        date: ['Aug 12, 2026', 'Aug 28, 2026', 'Sep 3, 2026', 'Sep 11, 2026', 'Sep 18, 2026', 'Sep 21, 2026'][(seed + i) % 6],
        title: titles[(seed + i * 3) % titles.length],
        body: bodies[(seed + i * 5) % bodies.length],
        verified: (seed + i) % 4 !== 0
      });
    }
    this.reviews.set(list);
  }
}
