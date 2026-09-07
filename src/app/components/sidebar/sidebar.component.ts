import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'khz-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarState',[
      state('yes', style({
        transform: 'translateX(0)',
        display: 'inline-block'
      })),
      state('no', style({
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      transition('yes => no', animate('100ms ease-in')),
      transition('no => yes', animate('100ms ease-out'))
    ])
    
  ]
})
export class SidebarComponent implements OnInit {
  activeSidebar = 'no';
  @Input() set showSidebar(val) {
    this.activeSidebar = val == true ? 'yes' : 'no';
  };
  constructor() { }
  ngOnInit() { }
  sidebarClose(val) {
    this.activeSidebar = 'no';
  }
}
