import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExternalAuthDto } from 'src/app/interfaces/ExternalAuthDto.model';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl: string | undefined;

  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;
  user!: SocialUser;
  @Output() newItemEvent = new EventEmitter<SocialUser>();

  constructor(private socialAuthService: SocialAuthService, private router: Router, private route: ActivatedRoute,private authService: AuthenticationService,private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      if (user) {
        const externalAuth: ExternalAuthDto = {
              provider: user.provider,
              idToken: user.idToken
            }
            this.validateExternalAuth(externalAuth);
      }
      localStorage.setItem("userEmail", user.email);
    });
    this.returnUrl = '/presentations';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)!.hasError(errorName)
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }  

   public externalLogin(externalAuth: ExternalAuthDto): void {
      this.authService.externalLogin('Login/ExternalLogin', externalAuth)
        .subscribe({
          next: (res: { token: string; isAuthSuccessful: any; }) => {
              localStorage.setItem("token", res.token);
              this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
              this.router.navigate([this.returnUrl]);
        },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = err.message;
            this.showError = true;
            this.authService.signOutExternal();
          }
        });
    }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.authService.externalLogin('Login/ExternalLogin', externalAuth)
      .subscribe({
        next: (res: { token: string; isAuthSuccessful: any; }) => {
            localStorage.setItem("token", res.token);
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
            this.router.navigate([this.returnUrl]);
      },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
          this.authService.signOutExternal();
        }
      });
  }
}