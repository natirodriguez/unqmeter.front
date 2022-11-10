import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtHelperService, JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

class MockAuthenticationService extends AuthenticationService{
  
}

class MockConfigService extends ConfigService{
  
}

class MockJwtHelperService extends JwtHelperService{
  
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule, JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:7054"],
          disallowedRoutes: []
        }
      }) ],
      providers:[{ provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ConfigService, useClass: MockConfigService },
        { provide: JwtHelperService, useClass: MockJwtHelperService},
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
