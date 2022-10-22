import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Slyde } from 'src/app/entities/Slyde';

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

  constructor(private http:HttpClient, private route: ActivatedRoute, private baseService: BaseService) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id');
    this.presentacionId = Number(this.id);
    
    this.getIPAddress();
    this.estaVencidaPresentacion();
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
    });
  }

  estaVencidaPresentacion(){
    this.baseService.getEstaVencidaLaPresentacion(this.presentacionId).subscribe((res : any) =>{
        this.estaVencida = res; 
    });
  }

  save(){
    
  }
}
