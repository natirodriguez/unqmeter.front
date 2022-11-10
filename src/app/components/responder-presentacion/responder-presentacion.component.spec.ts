import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

import { ResponderPresentacionComponent } from './responder-presentacion.component';

describe('ResponderPresentacionComponent', () => {
  let component: ResponderPresentacionComponent;
  let fixture: ComponentFixture<ResponderPresentacionComponent>;

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

    fixture = TestBed.createComponent(ResponderPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
