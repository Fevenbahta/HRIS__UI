
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { EmergencyContactService } from 'app/service/emergency-contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { PidService } from 'app/service/pid.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emergencycontact',
  templateUrl: './emergencycontact.component.html',
  styleUrls: ['./emergencycontact.component.scss']
})
export class EmergencycontactComponent implements OnInit {
  emergencycontactSaved: boolean = false;
  emergencycontacts: EmergencyContact[] = []; 

  emergencycontact:EmergencyContact={
    pId:0,
    id:  undefined,
   createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "",
    region: '', 
     town: '', 
     phoneNumber: '', 
     houseNo:'',
     subCity:'',
     status:0,
     name: "",
     kebele: "",
     relationship: "",

}
constructor(
  private formBuilder: FormBuilder,
  private emergencycontactservice: EmergencyContactService,
  private employeeIdService: EmployeeIdService,
  private dialog: MatDialog,
  private router:Router){}
ngOnInit():void {
  this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
    }

emergencycontactForm: FormGroup = this.formBuilder.group({
  phoneNumber: ['', Validators.required],
});

buttons = [
  { label: ' Add Employee ', route: '/employee-registration' },
  { label: '  List Employee ', route: '/employee-list' }, 
    {label:'Employee History', route:'/history'}
];
addEmergencyContact() {
  this.emergencycontact.empId = this.employeeIdService.employeeId;
  this.emergencycontactservice.addEmergencyContact(this.emergencycontact)
  .subscribe({
    next: (emergencycontacts) => {

     this.emergencycontactSaved=true
      setTimeout(() => {
        this.emergencycontactSaved = false;
      }, 2000);
      this.emergencycontactservice.getAllEmergencyContact()
      .subscribe({
        next: (emergencycontacts) => {
          // Filter emergency contacts for the current employee
          this.emergencycontacts = emergencycontacts.filter(contact => contact.empId === this.employeeIdService.employeeId);
        },
        error(response) {
          console.log(response);
        },
      });
    
      // Add the current work experience to the array
      this.emergencycontacts.push({ ...this.emergencycontact });
      // Reset the form fields
      this.emergencycontact = {
        pId:0,
        id:  undefined,
       createdBy: '', 
         createdDate: "2023-07-20T13:56:00.062Z", 
         updatedDate: "2023-07-20T13:56:00.062Z", 
         updatedBy: '', 
         empId: "",
        region: '', 
         town: '', 
         phoneNumber: '', 
         houseNo:'',
         subCity:'',
         status:0,
         name: "",
         kebele: "",
         relationship: "",
      };
    },
 error(response){
  console.log(response)
}
})}

editEmergencyContact(emergencyContact: EmergencyContact): void {
  // Here, we will navigate to the edit page for the selected EmergencyContact.
  this.router.navigate(["/edit-emergencyContact", emergencyContact.id]);
}
deleteEmergencyContact(EmergencyContact: EmergencyContact): void {
   const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {
  if (result) {
    // If the user confirms the deletion, we can call the service to delete the EmergencyContact.
    this.emergencycontactservice.deleteEmergencyContact(EmergencyContact.id).subscribe(
      () => {
        // EmergencyContact deleted successfully, we can update the list of EmergencyContacts after deletion.
        // Here, we are simply filtering out the deleted EmergencyContact from the EmergencyContacts array.
        this.emergencycontacts = this.emergencycontacts.filter((t) => t.id !== EmergencyContact.id);

        this.router.navigate(['employee-registration/emergency-contact']);
        alert('EmergencyContact deleted successfully!');
      },
      (error) => {
        console.error(error);
        // If there was an error during deletion, you can show an error message.
        alert('Failed to delete the EmergencyContact. Please try again later.');
      }
    );
  }
}
)}}
