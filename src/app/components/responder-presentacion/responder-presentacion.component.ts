import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Slyde } from 'src/app/entities/Slyde';
import { Respuesta,DescripcionRespuesta } from 'src/app/entities/Respuesta';

@Component({
  selector: 'responder-presentacion',
  templateUrl: './responder-presentacion.component.html',
  styleUrls: ['./responder-presentacion.component.scss']
})
export class ResponderPresentacionComponent implements OnInit {
  ipAddress:string;
  id : string;
  presentacionId: number;
  estaVencida: boolean; 
  tieneSlydeSinRespuesta: boolean;
  slydes: Slyde[] = [];
  puedeGuardar: boolean; 

  slydeActual: Slyde;
  cantMaxPerParticipantes: Array<number>;

  model: any = [];
  openEnded: string = "";

  respuestaActual: Respuesta = {
    id: 0,
    slydeId: 0, 
    participante: '',
    descripcionesRespuesta: [], 
    descripcionGeneral: null
  }

  constructor(private http:HttpClient, private route: ActivatedRoute, private baseService: BaseService) { }

  ngOnInit(): void {
    this.puedeGuardar = false; 
    this.id =this.route.snapshot.paramMap.get('id');
    this.presentacionId = Number(this.id);
    
    this.getIPAddress();
    this.estaVencidaPresentacion();

    this.baseService.refreshRequired.subscribe( res =>
      this.getIPAddress()
    );
  }

  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      this.getSlydes(res.ip);
    });
  }

  getSlydes(ip){
    this.baseService.getSlydesSinRespuestas(this.presentacionId, ip).subscribe((res:any)=>{
      this.slydes = res; 
      this.tieneSlydeSinRespuesta = this.slydes.length > 0;
      this.slydeActual = res[0];
      this.cantMaxPerParticipantes = new Array(this.slydeActual.cantMaxRespuestaParticipantes);
    });
  }

  estaVencidaPresentacion(){
    this.baseService.getEstaVencidaLaPresentacion(this.presentacionId).subscribe((res : any) =>{
        this.estaVencida = res; 
    });
  }

  descripcionRespuestaWordCloud(){
    if(this.slydeActual.tipoPregunta == 2){
        this.puedeGuardar = this.model.length > 0; 
        for(let o of this.model){
          let opcionSlyde = new DescripcionRespuesta(); 
          opcionSlyde.descripcion = o;
    
          this.respuestaActual.descripcionesRespuesta.push(opcionSlyde);
        };
    }
  }

  descripcionRespuestaTextoAbierto(){
    if (this.slydeActual.tipoPregunta == 4){
      this.puedeGuardar = this.openEnded.length > 0;
      this.respuestaActual.descripcionGeneral = this.openEnded;
    }
  }

  save(){
    this.respuestaActual.slydeId = this.slydeActual.id;
    this.respuestaActual.participante = this.ipAddress;

    this.descripcionRespuestaWordCloud(); 
    this.descripcionRespuestaTextoAbierto();

    if(this.puedeGuardar){
      this.baseService.saveRespuesta(this.respuestaActual).subscribe((res : any) =>{
        this.model = [];
      });
    }
  }
}
