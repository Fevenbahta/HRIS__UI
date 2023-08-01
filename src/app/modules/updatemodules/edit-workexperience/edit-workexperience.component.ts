import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { WorkExperienceService } from 'app/service/work-experience.service';

@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrls: ['./edit-workexperience.component.css']
})
export class EditWorkexperienceComponent {

  workExperienceUpdated: boolean = false;

  workExperienceId: string;

  workExperience: WorkExperience;
  workExperiences: WorkExperience[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
  ];

  constructor(
    private workExperienceService: WorkExperienceService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.workExperienceId = params['id'].toString();
      // Get all work experiences
      this.workExperienceService.getAllWorkExperience().subscribe({
        next: (workExperiences) => {
          this.workExperiences = workExperiences;
        },
        error: (response) => {
          console.log(response);
        }
      });
    
      // Get all educations

 
  
      // Get the work experience by ID if it exists

        this.workExperienceService.getWorkExperience(this.workExperienceId).subscribe({
          next: (workExperience) => {
            this.workExperience = workExperience;
        
          },
          error: (response) => {
            console.log(response);
          }
        });
      })
    
  }
  
  updateWorkExperience(): void {
    this.workExperienceUpdated = true;
    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience, this.workExperienceId).subscribe({
      next: () => {

      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  editWorkExperience(WorkExperience: WorkExperience): void {
    // Here, we will navigate to the edit page for the selected WorkExperience.
    this.router.navigate(['/edit-workExperience', WorkExperience.id]);
  }

  deleteWorkExperience(WorkExperience: WorkExperience): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this WorkExperience?');

    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the WorkExperience.
      this.workExperienceService.deleteWorkExperience(this.workExperience.id).subscribe(
        () => {
          // WorkExperience deleted successfully, we can update the list of WorkExperiences after deletion.
          // Here, we are simply filtering out the deleted WorkExperience from the WorkExperiences array.
          this.workExperiences = this.workExperiences.filter((t) => t.id !== this.workExperience.id);

          // You can also show a success message to the user.
          alert('WorkExperience deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the WorkExperience. Please try again later.');
        }
      );
    }
  }
}
