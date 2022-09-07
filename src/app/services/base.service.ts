import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "./config.service";
import { Observable } from "rxjs";
import { Message } from "../entities/Message";
import { Presentacion } from "../entities/Presentacion";

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

    getHelloWorld(){
        var subPath = 'GetHelloWorld';

        return this.http.get<Message>(this.unqMeterUrl
            .concat(this.Controller)
            .concat(subPath));
    }

    getMisPresentaciones() : Observable<Presentacion[]> {
      var subPath = 'GetMisPresentaciones';

      return this.http.get<Presentacion[]>(this.unqMeterUrl
          .concat(this.Controller)
          .concat(subPath));
    }

    savePresentacion(presentacion: Presentacion){
      const headers = { 'content-type': 'application/json'}; 
      var subPath = 'PostPresentacion';
      const body=JSON.stringify(presentacion);

      this.http.put<Presentacion>(this.unqMeterUrl
        .concat(this.Controller)
        .concat(subPath), body,{'headers':headers});
    }
}