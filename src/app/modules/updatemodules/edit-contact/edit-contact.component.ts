import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/service/contact.service';
import { Contact } from 'app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact:Contact;
  contacts:Contact[]=[]
  contactId: string;
  addContactRequest: Contact = {
    region: '',
    town: '',
    subCity: '',
    woreda: '',
    Kebele: '',
    houseNo: '',
    postCode: 0,
    phoneNumber: '',
     updatedDate: "2023-07-20T13:56:00.062Z", 
     updatedBy: '', 
     empId: "3fa85d64-5717-4562-b3fc-2c963f66afa6",
     email: '',
  };
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const contactId = params.get('id');
      if (contactId) {
        this.contactService.getContact(contactId).subscribe({
          next: (contact) => {
            this.addContactRequest = contact;
          },
          error: (response) => {
            console.log(response);
          }
        });
      }
    });

    this.contactService.getAllContacts() 
    .subscribe({ 
      next: (contacts) => { 
        this.contacts = contacts; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
  }
  contactForm: FormGroup = this.formBuilder.group({
    phoneNumber: ['', Validators.required],
    
  });
  updateContact(): void {
    if (this.addContactRequest.id) {
      
      this.contactService.updateContact(this.addContactRequest,this.addContactRequest.id ).subscribe({
        next: (contact) => {
         
          this.router.navigate(['/employee-registration/contact']); 
          
        },
        error: (response) => {
          console.log(response);
        }
      });
    }
  }

  editContact(Contact: Contact): void {
    // Here, we will navigate to the edit page for the selected Contact.
    this.router.navigate(["/edit-contact", this.contact.id]);
  }
  deleteContact(Contact: Contact): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Contact?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Contact.
      this.contactService.deleteContact(this.contact.id).subscribe(
        () => {
          // Contact deleted successfully, we can update the list of Contact after deletion.
          // Here, we are simply filtering out the deleted Contact from the Contact array.
          this.contacts = this.contacts.filter((t) => t.id !== this.contact.id);
  
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
  }}