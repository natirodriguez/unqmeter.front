import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "./config.service";
import { catchError, Observable, of, Subject, tap } from "rxjs";
import { Message } from "../entities/Message";
import { Presentacion } from "../entities/Presentacion";
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { TipoPregunta } from "../entities/TipoPregunta";
import { Slyde } from "../entities/Slyde";

@Injectable({
    providedIn: 'root'
  })
  
  export class BaseService {
    
    readonly httpOptions = {
      headers: this.getHeaders()
    };
  
    private getHeaders() {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=UTF-8;');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      headers.append('Access-Control-Allow-Headers', 'Content-Type');
      headers.append('Access-Control-Allow-Credentials', 'true')
      headers.append('Accept', 'application/pdf');
    }
    private _refreshRequired = new Subject<void>();

    constructor(public http: HttpClient,private configService : ConfigService,private router: Router) {
    }
    
    unqMeterUrl = this.configService.config.unqMeterApiUrl;

    Controller = 'Presentation/';

    get refreshRequired(){
        return this._refreshRequired;
    }

    getMisPresentaciones(email: string) : Observable<Presentacion[]> {
      var subPath = 'GetMisPresentaciones';
      const body=JSON.stringify(email);

      return this.http.get<Presentacion[]>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath)
          .concat("/"+ email));
    }

    savePresentacion(presentacion: Presentacion){
      var subPath = 'PostNuevaPresentacion';
      const body= JSON.stringify(presentacion);

      return this.http.post<Presentacion>(this.unqMeterUrl
        .concat(this.Controller)
        .concat(subPath), body, {headers: {'accept':'*/*','Content-Type':'application/json; charset=UTF-8;'}, observe: 'response'})
        .pipe(
          catchError(err => of([]))
      );
    }

    getPresentacion(id: number) : Observable<Presentacion> {
      var subPath = 'GetPresentacion';

      return this.http.get<Presentacion>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath)
          .concat("/"+ id));
    }
    
    clonarPresentacion(presentacion: Presentacion){
      var subPath = 'PostClonarPresentacion';
      const body= JSON.stringify(presentacion.id);

      return this.http.post(this.unqMeterUrl
        .concat(this.Controller)
        .concat(subPath), body, {headers: {'accept':'*/*','Content-Type':'application/json; charset=UTF-8;'}, observe: 'response'})
        .pipe(
          catchError(err => of([]))
      );
    }

    getTipoPreguntas() : Observable<TipoPregunta[]>{
      var subPath = 'GetTipoPreguntas';

      return this.http.get<TipoPregunta[]>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath));
    }

    getSlydesPresentation(idPresentation : number) : Observable <Slyde[]>{
      var subPath = 'GetSlydesByIdPresentation';

      return this.http.get<Slyde[]>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath)
          .concat("/" + idPresentation));
    }

    saveSlyde(slyde: Slyde) : Observable <any>{
      var subPath = 'SaveSlyde';
      const body= JSON.stringify(slyde);

      return this.http.post<any>(this.unqMeterUrl
        .concat(this.Controller)
        .concat(subPath), body, {headers: {'accept':'*/*','Content-Type':'application/json; charset=UTF-8;'}, observe: 'response'})
        .pipe(
          tap(() => {
              this.refreshRequired.next();
          }),
          catchError(err => of([]))
      );
    }
}