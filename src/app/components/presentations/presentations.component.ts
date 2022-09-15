import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Presentacion } from 'src/app/entities/Presentacion';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss']
})
export class PresentationsComponent implements OnInit {

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
