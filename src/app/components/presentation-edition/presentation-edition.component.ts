import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'presentation-edition',
  templateUrl: './presentation-edition.component.html',
  styleUrls: ['./presentation-edition.component.scss']
})
export class PresentationEditionComponent implements OnInit {
  userName: string;

  constructor(private route: ActivatedRoute,private authService: AuthenticationService) { }

  ngOnInit(): void {
    const presentationId = this.route.snapshot.paramMap.get('id');
    this.userName = localStorage.getItem("userName");
  }

}
