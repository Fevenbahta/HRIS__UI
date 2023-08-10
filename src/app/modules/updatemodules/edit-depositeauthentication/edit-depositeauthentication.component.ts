import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
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
    id:undefined,
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
  depositeauthenticationSaved: boolean = false;
  depositeAuthentications:DepositeAuthentication[]=[];

  
  constructor(
    private depositeAuthenticationService: DepositeAuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
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
    this.depositeAuthenticationService.updateDepositeAuthentication(this.depositeAuthentication, this.depositeAuthentication.id).subscribe({
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
this.depositeAuthentication ={
  pId:0,
  id:  undefined,
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
  }
  editDepositeAuthentication(DepositeAuthentication: DepositeAuthentication): void {
    const depositeAuthenticationToEdit = this.depositeAuthentications.find(depositeAuthentication => depositeAuthentication.id === DepositeAuthentication.id);
    this.depositeAuthentication = depositeAuthenticationToEdit;
  }

  deleteDepositeAuthentication(deositeAuthentication: DepositeAuthentication): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.depositeAuthenticationService.deleteDepositeAuthentication(deositeAuthentication.id).subscribe(
        () => {
         
          this.depositeAuthentications = this.depositeAuthentications.filter((t) => t.id !== deositeAuthentication.id);
          this.router.navigate(['employee-registration/deositeAuthentication']);
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
         // alert('Failed to delete the deositeAuthentication. Please try again later.');
        }
        );
      }
    });
  }
  
  addDepositeAuthentication() {
    this.depositeAuthentication.empId = this.employeeIdService.employeeId;
    this.depositeAuthenticationService.addDepositeAuthentication(this.depositeAuthentication)
    .subscribe({
      next: (employee) => {
        this.depositeauthenticationSaved = true;
        setTimeout(() => {
          this.depositeauthenticationSaved = false;
        }, 2000);
        // Add the current work experience to the array
        this.depositeAuthentications.push({ ...this.depositeAuthentication });
        // Reset the form fields
        this.depositeAuthentication = {
          pId:0,
          id: undefined,
         createdBy: '', 
           createdDate: "2023-07-20T13:56:00.062Z",   
           updatedDate: "2023-07-20T13:56:00.062Z", 
           updatedBy: '', 
           empId: "A78C1592-6804-4FB3-81EA-26BB1FF7F7A5",
           status:0,
         bank: '',
         bankBranch: '',
         bankAccount:0,
         tinNumber: '',
        };
      },
   error(response){
    console.log(response)
  }
  })}
}
