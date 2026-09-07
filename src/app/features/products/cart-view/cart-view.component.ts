import { Component, OnInit, computed, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogStore } from '../store/catalog-store.service';
import { CatalogItem } from '../store/CatalogItem';
import { OverlayService } from '../../../components/overlay/services/overlay.service';
import { PaymentsService, OrderReceipt } from '../services/payments.service';

@Component({
  selector: 'khz-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  public basket = this.catalogStore.basket;

  public itemCount = computed(() => {
    return this.basket().reduce((acc, item) => acc + (item.quantity || 1), 0);
  });

  public subtotal = computed(() => {
    return this.basket().reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  });

  public freeShippingThreshold = 75;

  public freeShippingProgress = computed(() => {
    return Math.min(100, Math.round((this.subtotal() / this.freeShippingThreshold) * 100));
  });

  public amountToFreeShipping = computed(() => {
    const diff = this.freeShippingThreshold - this.subtotal();
    return diff > 0 ? diff : 0;
  });

  public shippingCost = computed(() => {
    if (this.subtotal() === 0 || this.subtotal() >= this.freeShippingThreshold) {
      return 0;
    }
    return 5.99;
  });

  public tax = computed(() => {
    return Math.round(this.subtotal() * 0.0825 * 100) / 100;
  });

  public discount = signal<number>(0);
  public appliedCode = signal<string>('');
  public promoCodeInput: string = '';
  public promoError = signal<string>('');
  public promoSuccess = signal<string>('');

  public grandTotal = computed(() => {
    return Math.max(0, this.subtotal() + this.shippingCost() + this.tax() - this.discount());
  });

  public isProcessing = signal<boolean>(false);
  public receipt = this.paymentSvc.latestReceipt;

  constructor(
    public catalogStore: CatalogStore,
    public overlayService: OverlayService,
    public paymentSvc: PaymentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.status === 'success') {
        const orderId = params.session_id || 'SD-' + Math.floor(100000 + Math.random() * 900000);
        this.paymentSvc.setReceipt(orderId, this.basket(), this.grandTotal());
        this.catalogStore.clearBasket();
      }
    });
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

  previewItem(item: CatalogItem) {
    this.overlayService.activate({ data: { item }, state: 'OPEN', type: 'previewItem' });
  }

  applyPromo() {
    const code = this.promoCodeInput.trim().toUpperCase();
    this.promoError.set('');
    this.promoSuccess.set('');

    if (!code) return;

    if (code === 'SAVAGE10') {
      const discountVal = Math.round(this.subtotal() * 0.1 * 100) / 100;
      this.discount.set(discountVal);
      this.appliedCode.set('SAVAGE10 (10% OFF)');
      this.promoSuccess.set('10% Street Discount applied!');
      this.promoCodeInput = '';
    } else if (code === 'PREPPER') {
      this.discount.set(15.00);
      this.appliedCode.set('PREPPER ($15 OFF)');
      this.promoSuccess.set('$15 Prepper VIP Discount applied!');
      this.promoCodeInput = '';
    } else {
      this.promoError.set('Invalid street code. Try "SAVAGE10".');
    }
  }

  removePromo() {
    this.discount.set(0);
    this.appliedCode.set('');
    this.promoSuccess.set('');
    this.promoError.set('');
  }

  handleCheckout() {
    if (this.basket().length === 0) return;

    this.isProcessing.set(true);

    this.paymentSvc.createCheckoutSession(this.basket(), this.grandTotal()).subscribe({
      next: (res) => {
        this.isProcessing.set(false);
        if (res.simulated) {
          // Clear shopping bag and present confirmed receipt
          this.catalogStore.clearBasket();
        }
      },
      error: (err) => {
        this.isProcessing.set(false);
        console.error('Checkout error:', err);
      }
    });
  }

  dismissReceipt() {
    this.paymentSvc.clearReceipt();
    this.router.navigate(['/products']);
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }
}
