import { enableProdMode, importProvidersFrom } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      AppModule
    )
  ]
}).catch(err => console.log(err));