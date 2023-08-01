import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { EmergencyContactService } from 'app/service/emergency-contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { PidService } from 'app/service/pid.service';

@Component({
  selector: 'app-emergencycontact',
  templateUrl: './emergencycontact.component.html',
  styleUrls: ['./emergencycontact.component.scss']
})
export class EmergencycontactComponent implements OnInit {
  emergencycontactSaved: boolean = false;
  emergencycontacts: EmergencyContact[] = []; 
emergencyContact:EmergencyContact;

  addEmergencyContactRequest:EmergencyContact={
    pId:0,
    id:  "3fa85f64-5717-4562-b3fc-2c963f66afa6",
   createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "A78C1592-6804-4FB3-81EA-26BB1FF7F7A5",
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
  private router:Router){}
ngOnInit():void {
  this.emergencycontactservice.getAllEmergencyContact() 
  .subscribe({ 
    next: (emergencycontacts) => { 
      this.emergencycontacts = emergencycontacts; 
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
  { label: '  List Employee ', route: '/employee-list' }
];
addEmergencyContact() {
  this.addEmergencyContactRequest.empId = this.employeeIdService.employeeId;
  this.emergencycontactservice.addEmergencyContact(this.addEmergencyContactRequest)
  .subscribe({
    next: (employee) => {
      this.emergencycontactSaved = true;
      setTimeout(() => {
        this.emergencycontactSaved = false;
      }, 2000);
      // Add the current work experience to the array
      this.emergencycontacts.push({ ...this.addEmergencyContactRequest });
      // Reset the form fields
      this.addEmergencyContactRequest = {
        pId:0,
        id:  "",
       createdBy: '', 
         createdDate: "2023-07-20T13:56:00.062Z", 
         updatedDate: "2023-07-20T13:56:00.062Z", 
         updatedBy: '', 
         empId: "A78C1592-6804-4FB3-81EA-26BB1FF7F7A5",
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
  // Here, we can show a confirmation dialog/modal to confirm the deletion.
  const confirmDelete = confirm('Are you sure you want to delete this EmergencyContact?');

  if (confirmDelete) {
    // If the user confirms the deletion, we can call the service to delete the EmergencyContact.
    this.emergencycontactservice.deleteEmergencyContact(this.emergencyContact.id).subscribe(
      () => {
        // EmergencyContact deleted successfully, we can update the list of EmergencyContacts after deletion.
        // Here, we are simply filtering out the deleted EmergencyContact from the EmergencyContacts array.
        this.emergencycontacts = this.emergencycontacts.filter((t) => t.id !== EmergencyContact.id);

        // You can also show a success message to the user.
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
}
