import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Presentacion } from 'src/app/entities/Presentacion';
import { BaseService } from 'src/app/services/base.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { NodeWithI18n } from '@angular/compiler';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss']
})
export class PresentationsComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  closeResult: string = '';
  user!: SocialUser;
  presentacionNueva: Presentacion = {
    id: 0,
    nombre: '', 
    tiempoDeVida: 0,
    fechaCreacion: '',
    tipoTiempoDeVida: 1,
    usuarioCreador: ''
  }

  nombreError!: string; 
  tiempoDeVidaError!: string; 
  formPresentacion = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tiempoDeVida: new FormControl('', [Validators.required]),
    tipoTiempoDeVida: new FormControl('', [Validators.required])
  });
  userEmail: string;
  loggedIn = false;

  constructor(private baseService: BaseService, private modalService: NgbModal,  
    private socialAuthService: SocialAuthService,private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("userEmail");

    if (this.userEmail != null){
      this.loggedIn = true;
    }

      this.baseService.getMisPresentaciones(this.userEmail).subscribe(
        (res: Presentacion[]) => this.presentaciones = res);  
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  savePresentacion() {
    if (this.formPresentacion.valid){
      this.presentacionNueva.usuarioCreador = this.userEmail;
      this.baseService.savePresentacion(this.presentacionNueva).subscribe((res : any) =>{
        if (res.status == 200) {
          this.toastr.success('Se realizo la operación con exito');
        }
        else {
          this.toastr.error('Error al realizar la operación');
        }
      },
      );
    } else {
      this.nombreError = "El título es requerido";
      this.tiempoDeVidaError = "El Tiempo de vida es requerido";
    }
  }
  
  signOut(): void {
    this.loggedIn = false;
    localStorage.clear();
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
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
