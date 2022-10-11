import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presentacion } from 'src/app/entities/Presentacion';
import { Slyde } from 'src/app/entities/Slyde';
import { TipoPregunta } from 'src/app/entities/TipoPregunta';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';

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
  
  constructor(private route: ActivatedRoute,private authService: AuthenticationService,private baseService: BaseService) { }

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
}