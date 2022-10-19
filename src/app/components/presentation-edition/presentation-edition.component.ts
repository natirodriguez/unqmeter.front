import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presentacion } from 'src/app/entities/Presentacion';
import { Slyde } from 'src/app/entities/Slyde';
import { TipoPregunta } from 'src/app/entities/TipoPregunta';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { SharePresentacionComponent } from '../share-presentacion/share-presentacion.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'presentation-edition',
  templateUrl: './presentation-edition.component.html',
  styleUrls: ['./presentation-edition.component.scss']
})
export class PresentationEditionComponent implements OnInit {
  userName: string;
  presentacion: Presentacion;
  slydes : Slyde[];
  tiposPregunta : TipoPregunta[];
  tipoPreguntaSel : TipoPregunta;
  modalReference: any;
  closeResult: string = '';

  constructor(private route: ActivatedRoute,private authService: AuthenticationService,private baseService: BaseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    const presentationId = this.route.snapshot.paramMap.get('id');
    this.getPresentacion(Number(presentationId));
    this.getTipoPreguntas();
    this.userName = localStorage.getItem("userName");
    this.slydes = [];
    this.slydes.push(new Slyde());
  }

  public getPresentacion(id: number){
    this.baseService.getPresentacion(id).subscribe(
      (res: Presentacion) => 
        this.presentacion = res);
  }

  public getTipoPreguntas(){
    this.baseService.getTipoPreguntas().subscribe(
      (res: TipoPregunta[]) => 
        this.tiposPregunta = res);
  }

  openShare(presentacion: Presentacion){
    this.modalReference = this.modalService.open(SharePresentacionComponent, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.componentInstance.presentacion = presentacion;

    this.modalReference.result.then((result) => {
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