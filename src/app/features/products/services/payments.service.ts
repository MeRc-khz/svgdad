import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CatalogItem } from '../store/CatalogItem';

export interface OrderReceipt {
  orderId: string;
  items: CatalogItem[];
  total: number;
  date: Date;
  status: 'confirmed' | 'pending';
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private _latestReceipt = signal<OrderReceipt | null>(null);
  public readonly latestReceipt = this._latestReceipt.asReadonly();

  constructor(private http: HttpClient) {}

  createCheckoutSession(items: CatalogItem[], totalAmount: number): Observable<{ url?: string; simulated?: boolean; orderId?: string }> {
    const payload = {
      items,
      totalAmount,
      successUrl: `${window.location.origin}/products/cart?status=success`,
      cancelUrl: `${window.location.origin}/products/cart?status=cancelled`
    };

    return this.http.post<{ url?: string; simulated?: boolean; orderId?: string }>('/api/create-checkout-session', payload).pipe(
      map(res => {
        if (res.url) {
          window.location.href = res.url;
        } else {
          const orderId = res.orderId || 'SD-' + Math.floor(100000 + Math.random() * 900000);
          this.setReceipt(orderId, items, totalAmount);
        }
        return res;
      }),
      catchError(err => {
        console.warn('Payment API unavailable, falling back to simulated order:', err);
        const orderId = 'SD-' + Math.floor(100000 + Math.random() * 900000);
        this.setReceipt(orderId, items, totalAmount);
        return of({
          simulated: true,
          orderId
        });
      })
    );
  }

  setReceipt(orderId: string, items: CatalogItem[], total: number) {
    this._latestReceipt.set({
      orderId,
      items: [...items],
      total,
      date: new Date(),
      status: 'confirmed'
    });
  }

  clearReceipt() {
    this._latestReceipt.set(null);
  }
}
