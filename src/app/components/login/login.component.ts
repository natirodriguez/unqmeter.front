import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseDto } from 'src/app/interfaces/AuthResponseDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExternalAuthDto } from 'src/app/interfaces/ExternalAuthDto.model';

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

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.extAuthChanged.subscribe( user => {
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      }

      this.validateExternalAuth(externalAuth);
    })
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)!.hasError(errorName)
  }

  // loginUser = (loginFormValue: any) => {
  //   this.authService.isExternalAuth = false;
  //   this.showError = false;
  //   const login = { ...loginFormValue };

  //   const userForAuth: UserForAuthenticationDto = {
  //     email: login.username,
  //     password: login.password,
  //     clientURI: 'http://localhost:4200/authentication/forgotpassword'
  //   }

  //   this.authService.loginUser('api/accounts/login', userForAuth)
  //     .subscribe({
  //       next: (res: AuthResponseDto) => {
  //         if (res.is2StepVerificationRequired) {
  //           this.router.navigate(['/authentication/twostepverification'],
  //             { queryParams: { returnUrl: this.returnUrl, provider: res.provider, email: userForAuth.email } })
  //         }
  //         else {
  //           localStorage.setItem("token", res.token);
  //           this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //           this.router.navigate([this.returnUrl]);
  //         }
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.errorMessage = err.message;
  //         this.showError = true;
  //       }
  //     })
  // }

  externalLogin = () => {
    this.showError = false;
    this.authService.signInWithGoogle();
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