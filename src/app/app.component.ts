import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Message } from './entities/Message';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  user!: SocialUser;
  constructor(private baseService: BaseService,private socialAuthService: SocialAuthService,private router: Router) {
  }

  title = '';

  ngOnInit(): void {
    this.socialAuthService.authState
    .subscribe(res => {
      this.user = res;
    })  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }
}

