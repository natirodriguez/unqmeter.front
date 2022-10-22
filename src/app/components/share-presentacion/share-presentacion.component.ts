import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'share-presentacion',
  templateUrl: './share-presentacion.component.html',
  styleUrls: ['./share-presentacion.component.scss']
})
export class SharePresentacionComponent implements OnInit {
  @Input() public presentacion;
  fechaFin: string;
  vencido: boolean;
  direccionURL: string;
  estaVencida: boolean; 

  constructor(private baseService: BaseService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.direccionURL = 'http://localhost:4200/responder-presentacion/' + this.presentacion.id;
    this.sharePresentacion();
    this.estaVencidaPresentacion();
  }

  sharePresentacion(){
    this.baseService.compartirPresentacion(this.presentacion).subscribe((res : any) =>{
      if(res.status== 200){
        this.fechaFin = res.body.fechaFinPresentacion; 
      }
    });
  }

  estaVencidaPresentacion(){
    this.baseService.getEstaVencidaLaPresentacion(this.presentacion.id).subscribe((res : any) =>{
        this.estaVencida = res; 
    });
  }
}
