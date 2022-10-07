import { AuthResponseDto } from 'src/app/interfaces/AuthResponseDto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { ExternalAuthDto } from 'src/app/interfaces/ExternalAuthDto.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  public isExternalAuth: boolean = false;

  constructor(private http: HttpClient, private configService : ConfigService, 
    private jwtHelper: JwtHelperService, private externalAuthService: SocialAuthService) { 
      this.externalAuthService.authState.subscribe((user) => {
        localStorage.setItem("userName", user.name);
        this.extAuthChangeSub.next(user);
        this.isExternalAuth = true;
      })
    }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    var tokenValid = token != null ? token : undefined;

    return !this.jwtHelper.isTokenExpired(tokenValid);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  
  public signOutExternal = () => {
    this.externalAuthService.signOut();
  }

  public externalLogin = (route: string, body: ExternalAuthDto) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.configService.config.unqMeterApiUrl), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
}