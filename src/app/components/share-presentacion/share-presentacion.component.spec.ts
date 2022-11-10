import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/services/config.service';

import { SharePresentacionComponent } from './share-presentacion.component';

describe('SharePresentacionComponent', () => {
  let component: SharePresentacionComponent;
  let fixture: ComponentFixture<SharePresentacionComponent>;

  beforeEach(async () => {
    let config = new ConfigService();
    config.config = {
      "unqMeterApiUrl": "https://localhost:7054/api/",
    };
    
    await TestBed.configureTestingModule({
      declarations: [ SharePresentacionComponent ],
      imports:[HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue:config},{provide: NgbActiveModal}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
