import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  unqMeterApiUrl: string;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

    public config: any;

    configUrl = './assets/config.json';

    getConfig() {
      
      return fetch(this.configUrl).then(res => res.json())
            .then(jsonData => {
            this.config = jsonData;
      });
    }

}