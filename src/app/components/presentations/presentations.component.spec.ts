import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { Presentacion } from 'src/app/entities/Presentacion';
import { BaseService } from 'src/app/services/base.service';
import { ConfigService } from 'src/app/services/config.service';

import { PresentationsComponent } from './presentations.component';

describe('PresentationsComponent', () => {
  let component: PresentationsComponent;
  let fixture: ComponentFixture<PresentationsComponent>;
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    let config = new ConfigService();
    config.config = {
      "unqMeterApiUrl": "https://localhost:7054/api/",
    };

    await TestBed.configureTestingModule({
      declarations: [ PresentationsComponent ],
      imports: [HttpClientTestingModule,ToastrModule.forRoot()],
      providers: [{ provide: ConfigService, useValue: config },
        {provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '590740812763-1sdtatroamhhu680qoa8vegbkubjkq72.apps.googleusercontent.com',{oneTapEnabled: false}
              ),
            },
          ],
          onError: (err) => {
            console.error(err);
          }
        } as SocialAuthServiceConfig
      }]
    })
    .compileComponents();

    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });

  
  var presentation = {
      "id": 1,
      "nombre": "Primer Presentacion",
      "usuarioCreador": "matilugo",
      "fechaCreacion": "2022-11-12T01:22:52.032Z",
      "tiempoDeVida": 10,
      "tipoTiempoDeVidaDescripcion": "string",
      "tipoTiempoDeVida": 1,
      "tieneFechaInicio": true
    }
  

  var response : any;
  response = {
    body: {
      "id": 1,
      "nombre": "Primer Presentacion",
      "usuarioCreador": "matilugo",
      "fechaCreacion": "2022-11-12T01:22:52.032Z",
      "tiempoDeVida": 10,
      "tipoTiempoDeVidaDescripcion": "string",
      "tipoTiempoDeVida": 1,
      "tieneFechaInicio": true
    },
    status: 200,
    statusText: 'OK'
  } 

  it('SavePresentacion() deberia guardar y retornar codigo 200', () => {
    service.savePresentacion(presentation).subscribe((res: HttpResponse<Presentacion>) => {
      expect(res.status).toEqual(response.status);
    });

    const req = httpMock.expectOne('https://localhost:7054/api/Presentation/PostNuevaPresentacion');
    expect(req.request.method).toBe('POST');
    req.flush(presentation);
  });

});
