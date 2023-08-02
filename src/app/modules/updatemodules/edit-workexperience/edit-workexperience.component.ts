import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { WorkExperienceService } from 'app/service/work-experience.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
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
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.workExperienceId = params['id'].toString();
      // Get all work experiences
      this.workExperienceService.getAllWorkExperience().subscribe({
        next: (workExperience) => {
          this.workExperiences = workExperience;
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
        this.router.navigate(['employee-registration/work-experience']);
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

  deleteWorkExperience(workExperience: WorkExperience): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User confirmed the delete action, proceed with deletion
        this.workExperienceService.deleteWorkExperience(workExperience.id).subscribe(
          () => {
            // WorkExperience deleted successfully, update the list of WorkExperiences
            this.workExperiences = this.workExperiences.filter((t) => t.id !== workExperience.id);
            this.router.navigate(['employee-registration/work-experience']);
            // Show a success message to the user (you can use MatSnackBar)
          },
          (error) => {
            console.error(error);
            // Show an error message to the user (you can use MatSnackBar)
          }
        );
      }
    });
  }

  }

