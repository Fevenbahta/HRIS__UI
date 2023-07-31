import { Component, OnInit } from '@angular/core';
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

  constructor(
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
  }

  updateEmergencyContact(): void {
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
}
