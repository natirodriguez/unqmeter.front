import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { BaseService } from 'src/app/services/base.service';
import { ConfigService } from 'src/app/services/config.service';
import { PresentationEditionComponent } from './presentation-edition.component';

describe('PresentationEditionComponent', () => {
  let component: PresentationEditionComponent;
  let fixture: ComponentFixture<PresentationEditionComponent>;
  let service: BaseService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    let config = new ConfigService();
    config.config = {
      "unqMeterApiUrl": "https://localhost:7054/api/",
    };
   
    await TestBed.configureTestingModule({
      declarations: [ PresentationEditionComponent ],
      imports: [ 
        RouterModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [{ provide: ConfigService, useValue:config}]
    })
    .compileComponents();
    
    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(PresentationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar las slydes correspondientes a la presentacion', () => {
    var slydes = [];
    slydes = [
      {
        "id": 1,
        "presentacion": null,
        "preguntaRealizada": null,
        "tipoPregunta": 1,
        "fechaCreacion": "2022-10-22T19:59:49.353",
        "cantMaxRespuestaParticipantes": null,
        "opcionesSlydes": [],
        "habilitadoParaResponder": true,
        "answers": []
      },
      {
        "id": 2,
        "presentacion": null,
        "preguntaRealizada": null,
        "tipoPregunta": 2,
        "fechaCreacion": "2022-11-12T21:13:49.353",
        "cantMaxRespuestaParticipantes": null,
        "opcionesSlydes": [],
        "habilitadoParaResponder": true,
        "answers": []
      }
    ];

    service.getSlydesPresentation(1).subscribe((response) => {
      expect(response).toEqual(slydes);
    });
    
    const req = httpMock.expectOne('https://localhost:7054/api/Presentation/GetSlydesAnswersByIdPresentation/1');
    expect(req.request.method).toBe('GET');
    req.flush(slydes);
    
  });
});
