import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'khz-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarState',[
      state('yes', style({
        transform: 'translateX(0)',
        display: 'flex'
      })),
      state('no', style({
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      transition('yes => no', animate('200ms ease-in')),
      transition('no => yes', animate('250ms ease-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  activeSidebar = 'no';
  @Input() set showSidebar(val) {
    this.activeSidebar = val == true ? 'yes' : 'no';
  }
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) { }
  ngOnInit() { }

  sidebarClose(val?: any) {
    this.activeSidebar = 'no';
    this.close.emit();
  }

  navigateAndClose(path: string) {
    this.sidebarClose();
    this.router.navigate([path]);
  }
}
