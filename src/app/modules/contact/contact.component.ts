
import { Route, Router } from '@angular/router';
import { Contact } from 'app/models/contact.model';
import { ContactService } from 'app/service/contact.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { PidService } from 'app/service/pid.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { EmployeeService } from 'app/service/employee.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contacts:Contact[]=[];
  contact:Contact;
  addContactRequest:Contact={
    pId:0,
    id: undefined,
    createdBy: '', 
     createdDate: "2023-07-20T13:56:00.062Z", 
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "",
    region: '', 
     town: '', 
     phoneNumber: '', 
     email: '',
     postCode: 0,
     houseNo:'',
     Kebele:'',
     woreda:'',
     subCity:'',
     status:0,
    

}
constructor(
  private formBuilder: FormBuilder,
  private pIdservice: PidService, 
  private contactservice: ContactService,
  private employeeIdService: EmployeeIdService,
  //private employeeService: EmployeeService,
  private dialog:MatDialog,
  private router:Router){}
  subscription: Subscription;

contactForm: FormGroup = this.formBuilder.group({
  phoneNumber: ['', Validators.required],
  
});

buttons = [
  { label: ' Add Employee ', route: '/employee-registration' },
  { label: '  List Employee ', route: '/employee-list' }
];
ngOnInit():void {

  const empid= this.employeeIdService.employeeId;
 
this.contactservice.getContact(this.employeeIdService.employeeId)

  
  .subscribe((contacts) => {
    this.contact = contacts;
  }); 
  
 }
addContact(){
  // if (this.contactForm.invalid) {
  //   this.contactForm.markAllAsTouched();

  this.addContactRequest.pId = this.pIdservice.pId;
  this.addContactRequest.empId = this.employeeIdService.employeeId;
  console.log(this.addContactRequest)
this.contactservice.addContact(this.addContactRequest)

.subscribe({
  
next:(contacts)=>{
 



},
 error(response){
  console.log(response)
}
})}

editContact(contact: Contact): void {
  // Here, we will navigate to the edit page for the selected Contact.
  this.router.navigate(["/edit-contact", contact.id]);
}


deleteContact(Contact: Contact): void {
  const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  dialogRef.afterClosed().subscribe((result) => {


  if (result) {
    // If the user confirms the deletion, we can call the service to delete the Contact.
    this.contactservice.deleteContact(Contact.id).subscribe(
      () => {
        // Contact deleted successfully, we can update the list of Contact after deletion.
        // Here, we are simply filtering out the deleted Contact from the Contact array.
        this.contacts = this.contacts.filter((t) => t.id !== Contact.id);
        this.router.navigate(['employee-registration/contact']);
        // You can also show a success message to the user.
        alert('Contact deleted successfully!');
      },
      (error) => {
        console.error(error);
        // If there was an error during deletion, you can show an error message.
        alert('Failed to delete the Contact. Please try again later.');
      }
    );
  }
})}
}

