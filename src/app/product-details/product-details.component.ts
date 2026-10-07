import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetailsComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);

  product: any = undefined;

  fallbackImage = 'https://via.placeholder.com/300';

  constructor() {
    console.log('🔥 PRODUCT DETAILS COMPONENT ACTIVE');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID:', id);

    if (!id) return;

    this.http.get(`https://dummyjson.com/products/${id}`).subscribe({
  next: (data: any) => {
    console.log('PRODUCT LOADED:', data);

    this.product = {
      ...data,
      image: data.thumbnail
    };

    this.cdr.detectChanges();
  },
  error: (err) => {
    console.error('ERROR:', err);
  },
});
}
}
