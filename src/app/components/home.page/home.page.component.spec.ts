import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home.page.component';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { Location } from "@angular/common";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const routes: Routes = [{path:'login', component: LoginComponent}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports: [RouterTestingModule.withRoutes(routes)],
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

  it('Navegar al componente de login cuando se hace click en el boton de login', () => {
    const location: Location = TestBed.inject(Location);
    const button = fixture.debugElement.query(By.css('button#button-login')).nativeElement;

    expect(location.path()).toBe('');
    button.click();
    
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/login');
    });
  });
});