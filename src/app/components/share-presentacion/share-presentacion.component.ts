import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Presentacion } from 'src/app/entities/Presentacion';
import { BaseService } from 'src/app/services/base.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'share-presentacion',
  templateUrl: './share-presentacion.component.html',
  styleUrls: ['./share-presentacion.component.scss']
})
export class SharePresentacionComponent implements OnInit {
  @Input() public presentacion = new Presentacion();
  fechaFin: string;
  vencido: boolean;
  direccionURL: string;
  estaVencida: boolean; 

  unqMeterUrl = this.configService.config.unqMeterApiPort;

  constructor(private baseService: BaseService, public activeModal: NgbActiveModal, private configService : ConfigService) { }

  ngOnInit(): void {
    this.direccionURL = this.unqMeterUrl + 'responder-presentacion/' + this.presentacion.id;
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
