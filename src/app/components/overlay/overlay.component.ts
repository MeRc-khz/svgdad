import { Component, Input, Output,EventEmitter, ViewChild, ComponentFactoryResolver, AfterViewInit, OnDestroy } from '@angular/core';
import { CompItem } from './comp-item';
import { HostDirective } from './host/host.directive';
import { IUtil } from '../../core/core.interface';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//Components
import { FootswitchComponent } from './footswitch/footswitch.component';
import { ModalComponent } from './modal/modal.component';
import { NotifierComponent } from './notifier/notifier.component';
import { ToasterComponent } from './toaster/toaster.component';
import { SplashComponent } from './splash/splash.component';
//Services
import { OverlayService } from './services/overlay.service';
import { ModalNetService } from './modal/services/modal-net.service';
//interfaces
import { IOverlay } from './overlay.interface';
//Store
import { CatalogStore } from '../../features/products/store/catalog-store.service';
@Component({
  selector: 'khz-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements AfterViewInit, OnDestroy {
  currentIdx = -1;
  @Input() comps: CompItem[];
  @Input() showOverlay;
  @ViewChild(HostDirective) psnHost: HostDirective;
  @Output() cartSize = new EventEmitter<any>();
  modalSub: Subscription;
  interval: any;
  overlaySub:Subscription;
  storeSub:Subscription;
  constructor(public catalogStore:CatalogStore, public modalNetService:ModalNetService, public http:HttpClient, private overlayService:OverlayService, private componentFactoryResolver: ComponentFactoryResolver) {
    console.log('we in here');
    this.modalSub = modalNetService.modalState.subscribe( msg => {
      if(msg.type == "CLOSE_MODAL") {
        this.hide();
      }
    })
    this.overlaySub = this.overlayService.overlayState.subscribe( (msg:IOverlay) => {
      console.log('overlay hit')
      if(msg.state === 'OPEN') {
        this.activate(msg)
      } else if(msg.state === 'CLOSE') {
        this.hide();
      }
      
    })
    this.storeSub = this.catalogStore.basket.subscribe((basketVal) => {
      let nSize = basketVal.length;
      console.log(basketVal.length)
      this.cartSize.emit({value:nSize})
    })
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    clearInterval(this.interval);
    this.overlaySub.unsubscribe();
    this.modalSub.unsubscribe();
  }

  activate(msg) {
    this.show(msg);
  }

  show(msg:IOverlay) {
    console.log(msg);
    let comp = this.overlayService.getComp(msg);
    //this.loadComp(comp);
    let compFactory = this.componentFactoryResolver.resolveComponentFactory(comp.component);
    let viewContainerRef = this.psnHost.viewContainerRef;
    viewContainerRef.clear();
    let compRef = viewContainerRef.createComponent(compFactory);
    (<IUtil>compRef.instance).data = comp.data;   
  }

  hide() {
    let viewContainerRef = this.psnHost.viewContainerRef;
    viewContainerRef.clear();
  }

  loadComp(comp) {
    let compFactory = this.componentFactoryResolver.resolveComponentFactory(comp);  
  }

  loadComps() {
    this.currentIdx = (this.currentIdx + 1) % this.comps.length;
    let compItem = this.comps[0];

    let compFactory = this.componentFactoryResolver.resolveComponentFactory(compItem.component);
    let viewContainerRef = this.psnHost.viewContainerRef;
    viewContainerRef.clear();
    let compRef = viewContainerRef.createComponent(compFactory);
    (<IUtil>compRef.instance).data = compItem.data;
  }

  getComps() {
    this.interval = setInterval(() => { this.loadComps(); }, 3000)
  }
}
