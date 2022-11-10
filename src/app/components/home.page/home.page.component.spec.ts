import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home.page.component';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers:[{
        provide: 'SocialAuthServiceConfig',
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

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear',() => {
    expect(component).toBeTruthy();
  });
});