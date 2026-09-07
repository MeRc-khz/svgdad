import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component'

export const routes: Routes = [
  {path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)},
  {path: 'landing', redirectTo: '', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
