import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component'

export const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'landing', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)},
  {path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
