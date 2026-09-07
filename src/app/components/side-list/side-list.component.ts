import { Component, computed } from '@angular/core';
import { animate, state, trigger, style, transition } from '@angular/animations';
import { SideListService } from './side-list.service';

@Component({
  selector: 'khz-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
  animations: [
    trigger('sideListState',[
      state('open', style({
        transform: 'translateX(0)'  
      })),
      state('close', style({
        transform: 'translateX(100%)'
      })),
      transition('open <=> close', animate('1000ms ease-in-out'))
    ])
  ]
})

export class SideListComponent {
  
  public sideListState = computed(() => this.sideListService.getShowDrawer()() ? 'open' : 'close');
 
  constructor(private sideListService: SideListService) {
  }

  clickHandler() {
    this.sideListService.toggleDrawer();
  }
}
