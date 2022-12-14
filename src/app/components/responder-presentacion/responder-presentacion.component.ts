import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Slyde } from 'src/app/entities/Slyde';
import { Respuesta,DescripcionRespuesta } from 'src/app/entities/Respuesta';
import { OpcionesSlyde } from 'src/app/entities/OpcionesSlyde';

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
  opcionesSlyde: OpcionesSlyde[] = []

  slydeActual: Slyde;
  cantMaxPerParticipantes: Array<number>;

  model: any = [];
  openEnded: string = "";
  opcionSeleccionada: number = 0;
  cantidadOpciones:number = 0; 

  respuestaActual: Respuesta = {
    id: 0,
    slydeId: 0, 
    participante: '',
    descripcionesRespuesta: [], 
    descripcionGeneral: null, 
    opcionElegidaId: null
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
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
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
      this.opcionesSlyde = this.slydeActual.opcionesSlydes;
      this.cantidadOpciones = this.opcionesSlyde.length;
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

  validacionesRanking(){
    var valorOpciones = this.opcionesSlyde.map(({ id }) => id.toString());
    var valorDevuelto = valorOpciones.some(e => !this.model.includes(e));

    if (this.slydeActual.tipoPregunta == 3){
        this.puedeGuardar = !valorDevuelto;

        if(this.puedeGuardar){
          for(let o of this.model){
            let opcionSlyde = new DescripcionRespuesta(); 
            opcionSlyde.descripcion = this.opcionesSlyde.filter(x => x.id.toString() == o)[0].opcion;
      
            this.respuestaActual.descripcionesRespuesta.push(opcionSlyde);
          };
        }
    }
  }

  validacionMultipleChoise(){
    if (this.slydeActual.tipoPregunta == 1){
      this.puedeGuardar = this.opcionSeleccionada != 0;
      this.respuestaActual.opcionElegidaId = this.opcionSeleccionada;
    }
  }

  save(){
    this.respuestaActual.slydeId = this.slydeActual.id;
    this.respuestaActual.participante = this.ipAddress;

    this.descripcionRespuestaWordCloud(); 
    this.descripcionRespuestaTextoAbierto();
    this.validacionesRanking();
    this.validacionMultipleChoise(); 

    if(this.puedeGuardar){
      this.baseService.saveRespuesta(this.respuestaActual).subscribe((res : any) =>{
        this.model = [];
      });
    }
  }
}
