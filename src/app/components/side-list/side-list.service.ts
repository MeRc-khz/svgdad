
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideListService {
  private showDrawer = signal(false);

  getShowDrawer() {
    return this.showDrawer.asReadonly();
  }

  toggleDrawer() {
    this.showDrawer.update(value => !value);
  }

  openDrawer() {
    this.showDrawer.set(true);
  }

  closeDrawer() {
    this.showDrawer.set(false);
  }
}
