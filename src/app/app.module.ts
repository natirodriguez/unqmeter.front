import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseService } from './services/base.service';
import { ConfigService } from './services/config.service';
import { HomePageComponent } from './components/home.page/home.page.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresentationEditionComponent } from './components/presentation-edition/presentation-edition.component';
import { SharePresentacionComponent } from './components/share-presentacion/share-presentacion.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ResponderPresentacionComponent } from './components/responder-presentacion/responder-presentacion.component';

export const configFactory = (configService: ConfigService) => {
  return () => configService.getConfig();
};

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    PresentationsComponent,
    PresentationEditionComponent,
    SharePresentacionComponent,
    ResponderPresentacionComponent
  ],
  entryComponents:[SharePresentacionComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7054"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [ConfigService,JwtHelperService,BaseService,{
    provide: APP_INITIALIZER,
    useFactory: configFactory,
    deps: [ConfigService],
    multi: true
  },
  {
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
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
