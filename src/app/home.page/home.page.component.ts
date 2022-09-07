import { Component, OnInit } from '@angular/core';
import { Presentacion } from '../entities/Presentacion';
import { BaseService } from '../services/base.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home.page',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  closeResult: string = '';

  constructor(private baseService: BaseService, private modalService: NgbModal) {
    
  }
  ngOnInit(): void {
    this.baseService.getMisPresentaciones().subscribe(
      (res:Presentacion[])=> this.presentaciones = res);
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
     
}
