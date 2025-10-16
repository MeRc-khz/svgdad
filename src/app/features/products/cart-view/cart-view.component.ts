import { Component, OnInit, computed } from '@angular/core'
import { CatalogStore } from '../store/catalog-store.service'
import { MatTableDataSource } from '@angular/material/table'
import { CatalogItem } from '../store/CatalogItem';
import { List } from 'immutable';
import { CurrencyPipe } from '@angular/common';
import { OverlayService } from '../../../components/overlay/services/overlay.service';
import { FormControl } from '@angular/forms';
import { environment as ENV } from '../../../../environments/environment';
import { PaymentsService } from '../services/payments.service';
@Component({
  selector: 'khz-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  public dataSource = this.catalogStore.basket;
  public total = computed(() => {
    return this.dataSource().reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.price * currentValue.quantity);
    }, 0);
  });
  private pymtHandler:any;
  private amount:number = 500;
  constructor(public paymentSvc:PaymentsService, public overlayService:OverlayService, public catalogStore:CatalogStore) {}
  
  ngOnInit() {
      this.pymtHandler = StripeCheckout.configure({
        key: ENV.stripeKey,
        image: "https://loremflickr.com/320/240",
        locale: 'auto',
        token: token => {
          this.paymentSvc.processPayment(token, this.amount)
        }
      })
  }

  handlePymt() {
    this.pymtHandler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: +this.total().toString().replace('.','')
    })
  }
  removeItem(item) {
    this.catalogStore.removeFromBasket(item);
  }

  previewItem(item) {
    this.overlayService.activate({data:{item}, state:'OPEN', type:'previewItem'});
  }

  qtyValUpdated(item,qty) {
    this.catalogStore.updateBasketQty(item, qty);
  }
}
