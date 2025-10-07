//angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

/* DSL Application Components */
import { OverlayModule } from './components/overlay/overlay.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { AuthenticationModule } from './components/authentication/authentication.module';

/* Material.angular.io Component Library */ //create a met2module
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from './core/core.module';

/* ngrx/store */
import { StoreModule } from '@ngrx/store';
import { SideListModule } from './components/side-list/side-list.module';
import { sideListReducer } from './components/side-list/side-list.reducer';

//Service
import { OverlayService } from './components/overlay/services/overlay.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SidebarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    AuthenticationModule,
    StoreModule.forRoot(sideListReducer),
    CoreModule,
    SideListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [OverlayService],
  bootstrap: [AppComponent]
})
export class AppModule {}
