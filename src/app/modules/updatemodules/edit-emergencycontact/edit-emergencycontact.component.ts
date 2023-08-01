import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyContact } from 'app/models/emergency-contact.model';
import { EmergencyContactService } from 'app/service/emergency-contact.service';

@Component({
  selector: 'app-edit-emergencycontact',
  templateUrl: './edit-emergencycontact.component.html',
  styleUrls: ['./edit-emergencycontact.component.scss']
})
export class EditEmergencyContactComponent implements OnInit {
  emergencyContactId: string;
  emergencyContact: EmergencyContact;
  emergencyContactUpdated: boolean = false;
  emergencyContacts:EmergencyContact[]=[];
  



  constructor(
    private formBuilder: FormBuilder,
    private emergencyContactService: EmergencyContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emergencyContactId = params['id'];
      this.emergencyContactService.getEmergencyContact(this.emergencyContactId).subscribe((emergencyContact) => {
        this.emergencyContact = emergencyContact;
      });
    });

    this.emergencyContactService.getAllEmergencyContact() 
    .subscribe({ 
      next: (emergencycontacts) => { 
        this.emergencyContacts = emergencycontacts; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
  }
  getEmergencyContactById(): void {
    this.emergencyContactService.getEmergencyContact(this.emergencyContactId).subscribe(
      (emergencyContact) => {
        this.emergencyContact = emergencyContact;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateEmergencyContact(): void {
    this.emergencyContactUpdated=true;
    this.emergencyContactService.updateEmergencyContact(this.emergencyContact, this.emergencyContactId).subscribe({
      next: () => {
        this.emergencyContactUpdated = true;
        setTimeout(() => {
          this.emergencyContactUpdated = false;
        }, 2000);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
  emergencycontactForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
  });
  
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  editEmergencyContact(EmergencyContact: EmergencyContact): void {
    // Here, we will navigate to the edit page for the selected EmergencyContact.
    this.router.navigate(["/edit-emergencyContact", EmergencyContact.id]);
  }
  deleteEmergencyContact(EmergencyContact: EmergencyContact): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this EmergencyContact?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the EmergencyContact.
      this.emergencyContactService.deleteEmergencyContact(this.emergencyContact.id).subscribe(
        () => {
          // EmergencyContact deleted successfully, we can update the list of EmergencyContacts after deletion.
          // Here, we are simply filtering out the deleted EmergencyContact from the EmergencyContacts array.
          this.emergencyContacts = this.emergencyContacts.filter((t) => t.id !== EmergencyContact.id);
  
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
