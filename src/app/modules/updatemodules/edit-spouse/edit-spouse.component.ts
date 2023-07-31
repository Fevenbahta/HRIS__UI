// edit-spouse.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spouse } from 'app/models/spouse.model';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-edit-spouse',
  templateUrl: './edit-spouse.component.html',
  styleUrls: ['./edit-spouse.component.scss']
})
export class EditSpouseComponent implements OnInit {
  spouseId: string;
  spouse: Spouse;
  spouses:Spouse[]=[]
 spouseSaved: boolean = false;
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spouseService: SpouseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spouseId = params['id'],toString();
      this.getSpouseById();
    });
  }

  getSpouseById(): void {
    this.spouseService.getSpouse(this.spouseId).subscribe(
      (spouse) => {
        this.spouse = spouse;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateSpouse(): void {
    this.spouseService.updateSpouse(this.spouse, this.spouseId, ).subscribe(
      () => {
        // Spouse updated successfully, you can redirect to the spouse list or show a success message.
        // this.router.navigate(['/spouse']);
        this.spouseSaved=true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editSpouse(Spouse: Spouse): void {
    // Here, we will navigate to the edit page for the selected Spouse.
    this.router.navigate(['/edit-Spouse', Spouse.id]);
  }
  deleteSpouse(Spouse: Spouse): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Spouse?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Spouse.
      this.spouseService.deleteSpouse(this.spouse.id).subscribe(
        () => {
          // Spouse deleted successfully, we can update the list of Spouses after deletion.
          // Here, we are simply filtering out the deleted Spouse from the Spouses array.
          this.spouses = this.spouses.filter((t) => t.id !== this.spouse.id);
  
          // You can also show a success message to the user.
          alert('Spouse deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the Spouse. Please try again later.');
        }
      );
    }
  }
}
