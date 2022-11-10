import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfigService } from 'src/app/services/config.service';
import { PresentationEditionComponent } from './presentation-edition.component';

describe('PresentationEditionComponent', () => {
  let component: PresentationEditionComponent;
  let fixture: ComponentFixture<PresentationEditionComponent>;

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
    
    fixture = TestBed.createComponent(PresentationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
