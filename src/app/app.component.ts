import { Component, OnInit } from '@angular/core';
import { CompItem } from './components/overlay/comp-item';
import { Store } from '@ngrx/store';
import { getToggle } from './components/side-list/side-list.reducer';
import { SideList } from './components/side-list/side-list.model';
import { ISideList } from './components/side-list/i-side-list';
import { Observable } from 'rxjs';
import { ToggleDrawer } from './components/side-list/side-list.actions';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from './components/overlay/overlay.module';
import { SideListModule } from './components/side-list/side-list.module';

@Component({
  selector: 'svgdad-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, MatToolbarModule, MatIconModule, MatButtonModule, OverlayModule, SideListModule]
})
export class AppComponent implements OnInit {
  comps: CompItem[];
  showLeftSidebar;
  cartSizeValue:number = 0;
  constructor( public store:Store<SideList>) {}

  
  ngOnInit() {}

  sidebarToggle() {
    this.showLeftSidebar = this.showLeftSidebar ? false : true;
  }
  sideListToggle() {
    this.store.dispatch(new ToggleDrawer());
  }
  cartSize(val) {
    this.cartSizeValue = val.value;
    console.log(val)
  }
}