import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { ConfigService } from 'src/app/services/config.service';

import { ResponderPresentacionComponent } from './responder-presentacion.component';

describe('ResponderPresentacionComponent', () => {
  let component: ResponderPresentacionComponent;
  let fixture: ComponentFixture<ResponderPresentacionComponent>;
  let service: BaseService;

  beforeEach(async () => {
    let config = new ConfigService();
    config.config = {
      "unqMeterApiUrl": "https://localhost:7054/api/",
    };
    
    await TestBed.configureTestingModule({
      declarations: [ ResponderPresentacionComponent],
      imports: [RouterModule.forRoot([]),HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue:config}]

    })
    .compileComponents();

    service = TestBed.inject(BaseService);

    fixture = TestBed.createComponent(ResponderPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('No deberia verse las slydes porque esta vencida la presentacion', () => {
    component.estaVencida = true;
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('div#divSlydes'));

    expect(div).toBeNull();
  });
});
