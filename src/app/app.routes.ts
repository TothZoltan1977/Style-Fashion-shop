import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Main } from './main/main';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { ProductsComponent } from './products/products';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
];
