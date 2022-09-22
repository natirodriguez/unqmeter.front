import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Presentacion } from 'src/app/entities/Presentacion';
import { BaseService } from 'src/app/services/base.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss']
})
export class PresentationsComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  closeResult: string = '';
  user!: SocialUser;
  presentacionNueva: Presentacion = {
    nombre: '', 
    usuarioCreador: ''
  }

  constructor(private baseService: BaseService, private modalService: NgbModal, private socialAuthService: SocialAuthService) {
    
  }
  ngOnInit(): void {
    this.socialAuthService.authState
      .subscribe(res => {
        this.user = res;
      })

      this.baseService.getMisPresentaciones(this.user).subscribe(
        (res: Presentacion[]) => this.presentaciones = res);  
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  savePresentacion() {
    this.presentacionNueva.usuarioCreador = this.user.email;
    this.baseService.savePresentacion(this.presentacionNueva);
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
