import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];

  // 🧠 TOAST
  message: string = '';
  showMessage: boolean = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  console.log('Products component loaded');

  this.http.get<any>('https://dummyjson.com/products?limit=24').subscribe({
    next: (data) => {
      this.products = data.products.map((product: any) => ({
        ...product,
        image: product.thumbnail,
        shortTitle:
          product.title.split(' ').slice(0, 6).join(' ') +
          (product.title.split(' ').length > 6 ? '...' : ''),
      }));

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('API ERROR:', err);
    },
  });
}

  // 🛒 KOSÁR
  addToCart(product: any) {
    const existing = this.cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });

      this.addToast(product);
    }
  }

  // 🧠 TOAST
  toasts: string[] = [];

  addToast(product: any) {
    this.toasts.push(product.title);
  }

  closeToast(index: number) {
    this.toasts.splice(index, 1);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ❌ TOAST ZÁRÁS
  closeMessage() {
    this.showMessage = false;
  }
}
