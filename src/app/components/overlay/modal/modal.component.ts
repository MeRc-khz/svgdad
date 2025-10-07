import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { categories, storedAs } from './modal.model';
import { ModalNetService } from './services/modal-net.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'psn-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  overrideForm:FormGroup;
  categories = ['SAFE1', 'UNSAFE4', 'LEVEL5'];
  storedAs = ['BASE', 'ASIS'];
  constructor(public http:HttpClient, private fb:FormBuilder, public modalNetService:ModalNetService) { 
    this.createOverrideForm();
  }

  ngOnInit() {
    console.log(this)
  }

  createOverrideForm() {
    this.overrideForm = this.fb.group({
      uName:[''],
      category:[''],
      storedas:['']
    })
  }

  overrideUrl() {
    this.modalNetService.setOverride(this.overrideForm.value)
      .subscribe( res => {
        console.log(res);
        this.modalNetService.sendCloseModal({type:'CLOSE_MODAL'});
      });
  }

 closeModal() {
   this.modalNetService.sendCloseModal({type:'CLOSE_MODAL'});
  }

}
