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
  tipoPreguntaSel : number;
  modalReference: any;
  closeResult: string = '';
  currentSlyde : Slyde = null;
  presentationId : string;
  questionTypeSelected : number;
  question : string = null;
  entries : number = null;

  constructor(private route: ActivatedRoute,private authService: AuthenticationService,private baseService: BaseService, private modalService: NgbModal) { }

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
        this.currentSlyde = this.currentSlyde != null ? this.currentSlyde : res[0];
        this.question = this.currentSlyde.preguntaRealizada;
        this.entries = this.currentSlyde.cantMaxRespuestaParticipantes;
        this.tipoPreguntaSel = this.currentSlyde.tipoPregunta;
      });
  }

  public saveSlyde(slyde : Slyde){
    this.baseService.saveSlyde(slyde).subscribe();
  }

  public deleteSlyde(slydeId : number){
    this.baseService.deleteSlyde(slydeId).subscribe();
  }
  
  newSlyde(){
    var slyde = new Slyde(this.questionTypeSelected);
    slyde.presentacionId = Number(this.presentationId);
    
    this.saveSlyde(slyde);
  }

  updateSlyde(){
    this.currentSlyde.preguntaRealizada = this.question;
    this.currentSlyde.cantMaxRespuestaParticipantes = this.entries;
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
  }

  setQuestionDescription(slydes : Slyde[]){
    this.slydes.forEach(slyde => {
      slyde.descripcionPregunta = this.tiposPregunta.find(x => x.codigo == slyde.tipoPregunta).descripcion;
      slyde.presentacionId = Number(this.presentationId);
    });
  }
  
}