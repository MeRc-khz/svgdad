import { Component, OnInit, computed } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CatalogStore } from '../store/catalog-store.service'
import { ModalNetService } from '../../../components/overlay/modal/services/modal-net.service';

@Component({
  selector: 'khz-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  public item: any;
  constructor(public modalNetService:ModalNetService, public route:ActivatedRoute, public catalogStore:CatalogStore) {}
  ngOnInit() {
    let pId:number;
    if(this['data'] && this['data'].item){
      pId = this['data'].item.id;
    }else {
      pId = +this.route.snapshot.params.pId;
    }
    this.loadData(pId);
  }

  loadData(pId) {
    let storeView = 'catalog';
    if(this['data'] && this['data'].item && this['data'].item.ordered) {
      storeView = 'basket';
    }
    this.item = computed(() => {
      const catalog = this.catalogStore[storeView]();
      return catalog.find(item => item.id === pId);
    });
  }

  add2Basket(item) {
    this.catalogStore.addToBasket(item, item.quantity);
    this.closeModal();
  }

  closeModal() {
    this.modalNetService.sendCloseModal({type:'CLOSE_MODAL'});
   }
}
