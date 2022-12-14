import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Presentacion } from 'src/app/entities/Presentacion';
import { Slyde } from 'src/app/entities/Slyde';
import { TipoPregunta } from 'src/app/entities/TipoPregunta';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BaseService } from 'src/app/services/base.service';
import { SharePresentacionComponent } from '../share-presentacion/share-presentacion.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpcionesSlyde } from 'src/app/entities/OpcionesSlyde';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ChartType } from 'angular-google-charts';
import { Answer } from 'src/app/entities/Answer';
import { trigger } from '@angular/animations';

@Component({
  selector: 'presentation-edition',
  templateUrl: './presentation-edition.component.html',
  styleUrls: ['./presentation-edition.component.scss']
})
export class PresentationEditionComponent implements OnInit {
  userName: string;
  presentacion: Presentacion;
  slydes : Slyde[] = [];
  tiposPregunta : TipoPregunta[];
  tipoPreguntaSel : number;
  modalReference: any;
  closeResult: string = '';
  currentSlyde : Slyde = null;
  presentationId : string;
  questionTypeSelected : number;
  question : string = null;
  entries : number = null;
  habilitado : boolean;
  itemsOpciones : OpcionesSlyde[] = [];
  estaVencida: boolean; 
  options: CloudOptions = {
    width: 700,
    height: 600,
    overflow: false,
  };

  data: CloudData[] = [];
  title = '';
  type;
  dataBar = [];
  columnNames = ['',''];
  optionsBar = { vAxis:{format: ''}};
  width = 500;
  height = 300;

  constructor(private route: ActivatedRoute, private baseService: BaseService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this. presentationId = this.route.snapshot.paramMap.get('id');
    this.getPresentacion(Number(this.presentationId));
    this.estaVencidaPresentacion(Number(this.presentationId));
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

  public getSlydesPresentation(idPresentation: number){
    this.baseService.getSlydesPresentation(idPresentation).subscribe(
      (res: Slyde[]) => {
        this.slydes = res;
        this.setQuestionDescription(this.slydes);
        var slydeSelect = this.currentSlyde != null ? this.slydes.find(x => x.id == this.currentSlyde.id) : res[0];
        this.currentSlyde = slydeSelect;
        this.question = this.currentSlyde.preguntaRealizada;
        this.entries = this.currentSlyde.cantMaxRespuestaParticipantes;
        this.itemsOpciones = this.currentSlyde.opcionesSlydes;
        this.tipoPreguntaSel = this.currentSlyde.tipoPregunta;
        this.habilitado = this.currentSlyde.habilitadoParaResponder;
        this.SetAnswersSlyde(this.currentSlyde);
      });
  }

  public saveSlyde(slyde : Slyde){
    this.baseService.saveSlyde(slyde).subscribe();
  }

  public deleteSlyde(slydeId : number){

    this.baseService.deleteSlyde(slydeId).subscribe((res : any) => {
      if (res == null) {
        this.slydes = [];
        this.currentSlyde = null;
      }
    });
  }

  public deleteOptionSlyde(optionslydeId : number){
    this.baseService.deleteOptionSlyde(optionslydeId).subscribe();
  }
  
  newSlyde(){
    var slyde = new Slyde(this.questionTypeSelected);
    slyde.presentacionId = Number(this.presentationId);
    
    this.saveSlyde(slyde);
  }

  updateSlyde(){
    this.currentSlyde.preguntaRealizada = this.question;
    if(this.tipoPreguntaSel == 2){
      this.currentSlyde.cantMaxRespuestaParticipantes = this.entries;
    }
    if(this.tipoPreguntaSel == 3){
      this.currentSlyde.opcionesSlydes = this.itemsOpciones;
    }
    this.currentSlyde.habilitadoParaResponder = this.habilitado;
    this.saveSlyde(this.currentSlyde);
  }

  changeType(){
    this.currentSlyde.tipoPregunta = Number(this.tipoPreguntaSel);
    let updateItem = this.slydes.find(x => x.id == this.currentSlyde.id);
    let index = this.slydes.indexOf(updateItem);

    updateItem.tipoPregunta = Number(this.tipoPreguntaSel);
    this.saveSlyde(updateItem);
  }

  setCurrentSlyde(slyde : Slyde){
      this.currentSlyde = slyde;
      this.tipoPreguntaSel = slyde.tipoPregunta;
      this.question = slyde.preguntaRealizada;
      this.entries = slyde.cantMaxRespuestaParticipantes;
      this.itemsOpciones = this.currentSlyde.opcionesSlydes;
      this.habilitado = this.currentSlyde.habilitadoParaResponder;
      this.SetAnswersSlyde(this.currentSlyde);
  }

  setQuestionDescription(slydes : Slyde[]){
    this.slydes.forEach(slyde => {
      slyde.descripcionPregunta = this.tiposPregunta.find(x => x.codigo == slyde.tipoPregunta).descripcion;
      slyde.presentacionId = Number(this.presentationId);
    });
  }

  addItem(){
    var newOption = new OpcionesSlyde();
    newOption.id = 0;
    newOption.opcion = "";
    
    this.itemsOpciones.push(newOption);

    this.updateSlyde();
  }
  
  estaVencidaPresentacion(idPresentation: number){
    this.baseService.getEstaVencidaLaPresentacion(idPresentation).subscribe((res : any) =>{
        this.estaVencida = res; 
        console.log(this.estaVencida);
    });
  }

  private SetAnswersSlyde (slyde: Slyde){
    if(slyde.answers.length > 0){
      switch (slyde.tipoPregunta){
        case 1:
          this.type = ChartType.ColumnChart;
          this.dataBar = this.MapAnswers(slyde.answers);
          break;
        case 2:
          this.data = slyde.answers as unknown as CloudData[];
          break;
        case 3:
          this.type = ChartType.BarChart;
          this.dataBar = this.MapAnswers(slyde.answers);
          break;
        default:
          break;
      }
    }
    
  }

  private MapAnswers(answers : Answer[]){
    var answersResult = []
    answers.forEach(answer => {
      answersResult.push([answer.text,answer.weight])
    });

    return answersResult;
  }

}