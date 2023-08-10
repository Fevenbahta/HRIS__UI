import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-edit-depositeauthentication',
  templateUrl: './edit-depositeauthentication.component.html',
  styleUrls: ['./edit-depositeauthentication.component.scss']
})
export class EditDepositeAuthenticationComponent implements OnInit {
  depositeAuthenticationId: string;
  depositeAuthentication: DepositeAuthentication ={
    pId:0,
    id:  "3fa85f64-5717-4562-b3fc-2c963f66afa6",
   createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "",
     status:0,
   bank: '',
   bankBranch: '',
   bankAccount:0,
   tinNumber: '',

};
  depositeAuthenticationUpdated: boolean = false;
  depositeAuthentications:DepositeAuthentication[]=[];

  
  constructor(
    private depositeAuthenticationService: DepositeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeIdService: EmployeeIdService,
    
  ) {}
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.depositeAuthenticationId = params['id'].toString();
    
    
  })

  this.depositeAuthenticationService.getAllDepositeAuthentication() 
  .subscribe({ 
    next: (depositeauthentications) => { 
      this.depositeAuthentications = depositeauthentications.filter(deposite => deposite.empId === this.employeeIdService.employeeId);
      ; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});
}

  
  updateDepositeAuthentication(): void {
    this. depositeAuthenticationUpdated=true;
    this.depositeAuthenticationService.updateDepositeAuthentication(this.depositeAuthentication, this.depositeAuthenticationId).subscribe({
      next: () => {
        this.depositeAuthenticationUpdated = true;
        this.router.navigate(['/employee-registration/deposite-authentication']); 
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
    const depositeAuthenticationToEdit = this.depositeAuthentications.find(depositeAuthentication => depositeAuthentication.id === DepositeAuthentication.id);
    this.depositeAuthentication = depositeAuthenticationToEdit;
  }
  deleteDepositeAuthentication(DepositeAuthentication: DepositeAuthentication): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this DepositeAuthentication?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the DepositeAuthentication.
      this.depositeAuthenticationService.deleteDepositeAuthentication(DepositeAuthentication.id).subscribe(
        () => {
          // DepositeAuthentication deleted successfully, we can update the list of DepositeAuthentications after deletion.
          // Here, we are simply filtering out the deleted DepositeAuthentication from the DepositeAuthentications array.
          this.depositeAuthentications = this.depositeAuthentications.filter((t) => t.id !== DepositeAuthentication.id);
          this.router.navigate(['/employee-registration/deposite-authentication']); 
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
