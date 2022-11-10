import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ConfigService } from 'src/app/services/config.service';

import { PresentationsComponent } from './presentations.component';

describe('PresentationsComponent', () => {
  let component: PresentationsComponent;
  let fixture: ComponentFixture<PresentationsComponent>;

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

    fixture = TestBed.createComponent(PresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });
});
