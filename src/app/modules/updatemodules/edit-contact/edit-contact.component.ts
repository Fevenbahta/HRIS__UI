import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/service/contact.service';
import { Contact } from 'app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
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
  }

  updateContact(): void {
    if (this.addContactRequest.id) {
      this.contactService.updateContact(this.addContactRequest,this.addContactRequest.id ).subscribe({
        next: (contact) => {
          this.router.navigate(['contacts']);
        },
        error: (response) => {
          console.log(response);
        }
      });
    }
  }
}

