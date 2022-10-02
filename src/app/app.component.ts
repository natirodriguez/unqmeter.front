import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './components/login/login.component';
import { Message } from './entities/Message';
import { AuthenticationService } from './services/authentication.service';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  user!: SocialUser;
  returnUrl = '/presentations';
  loggedIn = false;
  
  constructor(private baseService: BaseService,private socialAuthService: SocialAuthService, private authService: AuthenticationService, private router: Router,private jwtHelper: JwtHelperService,) {
  }

  title = '';

  ngOnInit(): void {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail != null){
      this.loggedIn = true;
    }
      this.socialAuthService.authState
      .subscribe(res => {
        if(res != null){
          this.loggedIn = true;
          this.router.navigate([this.returnUrl]);
        }
      })
  }

  signOut(): void {
    this.loggedIn = false;
    localStorage.clear();
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }

}

