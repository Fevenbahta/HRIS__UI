import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { DepositeAuthenticationService } from 'app/service/deposite-authentcation.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-deposite-authenticaton',
  templateUrl: './deposite-authenticaton.component.html',
  styleUrls: ['./deposite-authenticaton.component.scss']
})


  export class DepositeAuthenticationComponent implements OnInit {
    depositeauthenticationSaved: boolean = false;
    depositeauthentications: DepositeAuthentication[] = []; 
    depositeAuthentication: DepositeAuthentication;

    addDepositeAuthenticationRequest:DepositeAuthentication={
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
  
  }
  
  constructor(
    private formBuilder: FormBuilder,
  
    private depositeauthenticationservice: DepositeAuthenticationService,
    private employeeIdService: EmployeeIdService,
    private router:Router,
    private dialog: MatDialog ){}


  ngOnInit():void {
    this.depositeauthenticationservice.getAllDepositeAuthentication() 
    .subscribe({ 
      next: (depositeauthentications) => { 
        this.depositeauthentications = depositeauthentications; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });

  }
  depositeauthenticationForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
  });
  
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  addDepositeAuthentication() {
    this.addDepositeAuthenticationRequest.empId = this.employeeIdService.employeeId;
    this.depositeauthenticationservice.addDepositeAuthentication(this.addDepositeAuthenticationRequest)
    .subscribe({
      next: (employee) => {
        this.depositeauthenticationSaved = true;
        setTimeout(() => {
          this.depositeauthenticationSaved = false;
        }, 2000);
        // Add the current work experience to the array
        this.depositeauthentications.push({ ...this.addDepositeAuthenticationRequest });
        // Reset the form fields
        this.addDepositeAuthenticationRequest = {
          pId:0,
          id:  "",
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
editDepositeAuthentication(depositeAuthentication: DepositeAuthentication): void {
  // Here, we will navigate to the edit page for the selected DepositeAuthentication.
 
  this.router.navigate(["/edit-depositeAuthentication", depositeAuthentication.id]);
}

deleteDepositeAuthentication(depositeAuthentication: DepositeAuthentication): void {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    width: '300px', // Set the desired width of the dialog
    data: { message: 'Are you sure you want to delete this DepositeAuthentication?' } // Pass any data you want to the delete confirmation component
  });

  dialogRef.afterClosed().subscribe(result => {
    // The result will be true if the user confirmed the deletion, otherwise false
    if (result === true) {
      // If the user confirmed the deletion, you can proceed with the delete logic here
      this.depositeauthenticationservice.deleteDepositeAuthentication(depositeAuthentication.id).subscribe(
        () => {
          // DepositeAuthentication deleted successfully, we can update the list of DepositeAuthentications after deletion.
          // Here, we are simply filtering out the deleted DepositeAuthentication from the DepositeAuthentications array.
          this.depositeauthentications = this.depositeauthentications.filter((t) => t.id !== depositeAuthentication.id);

          // You can also show a success message to the user.
          console.log('DepositeAuthentication deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          console.log('Failed to delete the DepositeAuthentication. Please try again later.');
        }
      );
    }
  });
}

}
  
  
  