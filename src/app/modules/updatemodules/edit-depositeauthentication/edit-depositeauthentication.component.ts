import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';

@Component({
  selector: 'app-edit-depositeauthentication',
  templateUrl: './edit-depositeauthentication.component.html',
  styleUrls: ['./edit-depositeauthentication.component.scss']
})
export class EditDepositeAuthenticationComponent implements OnInit {
  depositeAuthenticationId: string;
  depositeAuthentication: DepositeAuthentication;
  depositeAuthenticationUpdated: boolean = false;

  constructor(
    private depositeAuthenticationService: DepositeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.depositeAuthenticationId = params['id'];
      this.depositeAuthenticationService.getDepositeAuthentication(this.depositeAuthenticationId).subscribe((depositeAuthentication) => {
        this.depositeAuthentication = depositeAuthentication;
      });
    });
  }

  updateDepositeAuthentication(): void {
    this.depositeAuthenticationService.updateDepositeAuthentication(this.depositeAuthentication, this.depositeAuthenticationId).subscribe({
      next: () => {
        this.depositeAuthenticationUpdated = true;
        setTimeout(() => {
          this.depositeAuthenticationUpdated = false;
        }, 2000);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
