import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit {
  returnUrl = '/presentations';
  loggedIn = false;
  
  constructor(private socialAuthService: SocialAuthService, private router: Router) {
  }
  
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

}
