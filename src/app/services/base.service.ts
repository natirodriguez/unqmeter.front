import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { Message } from "../entities/Message";
import { Presentacion } from "../entities/Presentacion";
import { SocialUser } from '@abacritt/angularx-social-login';

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
    
    constructor(public http: HttpClient,private configService : ConfigService) {
    }
    
    unqMeterUrl = this.configService.config.unqMeterApiUrl;

    Controller = 'Presentation/';

    getMisPresentaciones(user: SocialUser) : Observable<Presentacion[]> {
      var subPath = 'GetMisPresentaciones';
      const body=JSON.stringify(user);

      return this.http.get<Presentacion[]>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath)
          .concat("/"+ user.email));
    }

    savePresentacion(presentacion: Presentacion){
      var subPath = 'PostNuevaPresentacion';
      const body= JSON.stringify(presentacion);

      return this.http.post<any>(this.unqMeterUrl
        .concat(this.Controller)
        .concat(subPath), body, {headers: {'accept':'*/*','Content-Type':'application/json; charset=UTF-8;'}, observe: 'response'});
    }
}