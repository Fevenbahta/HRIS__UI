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
  depositeAuthentications:DepositeAuthentication[]=[];
  constructor(
    private depositeAuthenticationService: DepositeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.depositeAuthenticationId = params['id'].toString();
      this.getDepositeAuthenticationById();
    
  })

  this.depositeAuthenticationService.getAllDepositeAuthentication() 
  .subscribe({ 
    next: (depositeauthentications) => { 
      this.depositeAuthentications = depositeauthentications; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});}
  getDepositeAuthenticationById(): void {
    this.depositeAuthenticationService.getDepositeAuthentication(this.depositeAuthenticationId).subscribe(
      (depositeAuthentication) => {
        this.depositeAuthentication = depositeAuthentication;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateDepositeAuthentication(): void {
    this. depositeAuthenticationUpdated=true;
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
  editDepositeAuthentication(DepositeAuthentication: DepositeAuthentication): void {
    // Here, we will navigate to the edit page for the selected DepositeAuthentication.
    this.router.navigate(["/edit-depositeAuthentication", DepositeAuthentication.id]);
  }
  deleteDepositeAuthentication(DepositeAuthentication: DepositeAuthentication): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this DepositeAuthentication?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the DepositeAuthentication.
      this.depositeAuthenticationService.deleteDepositeAuthentication(this.depositeAuthentication.id).subscribe(
        () => {
          // DepositeAuthentication deleted successfully, we can update the list of DepositeAuthentications after deletion.
          // Here, we are simply filtering out the deleted DepositeAuthentication from the DepositeAuthentications array.
          this.depositeAuthentications = this.depositeAuthentications.filter((t) => t.id !== DepositeAuthentication.id);
  
          // You can also show a success message to the user.
          alert('DepositeAuthentication deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the DepositeAuthentication. Please try again later.');
        }
      );
    }
  }
  
  
}
