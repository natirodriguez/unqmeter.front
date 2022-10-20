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
  tipoPreguntaSel : number;
  currentSlyde : Slyde;
  presentationId : string;
  questionTypeSelected : number;

  constructor(private route: ActivatedRoute,private authService: AuthenticationService,private baseService: BaseService) { }

  ngOnInit(): void {
    this. presentationId = this.route.snapshot.paramMap.get('id');
    this.getPresentacion(Number(this.presentationId));
    this.getTipoPreguntas();
    this.getSlydesPresentation(Number(this.presentationId));
    this.userName = localStorage.getItem("userName");
    this.baseService.refreshRequired.subscribe( res =>
      this.getSlydesPresentation(Number(this.presentationId))
    );
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

  public getSlydesPresentation(idPresentation: number){
    this.baseService.getSlydesPresentation(idPresentation).subscribe(
      (res: Slyde[]) => {
        this.slydes = res;
        this.currentSlyde = res[0];
        this.tipoPreguntaSel = this.currentSlyde.tipoPregunta;
      });
  }

  public saveSlyde(){
    var slyde = new Slyde(this.questionTypeSelected)
    slyde.presentacionId = Number(this.presentationId);

    this.baseService.saveSlyde(slyde).subscribe();
  }
  
  changeType(){
    this.currentSlyde.tipoPregunta = Number(this.tipoPreguntaSel);
  }

  setCurrentSlyde(slyde : Slyde){
      this.currentSlyde = slyde;
  }
  
}