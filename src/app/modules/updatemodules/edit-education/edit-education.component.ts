import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { Education } from 'app/models/work-experience.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent {
  educationUpdated: boolean = false;
  educationId: string; 
  education: Education;
  educations: Education[] = [];
  educationlevels: EducationLevel[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
  ];

  constructor(
    private educationService: EducationService,
    private dialog: MatDialog,

    private route: ActivatedRoute,
    private router: Router,
    private educationlevelservice: EducationLevelService,
    private employeeIdService:EmployeeIdService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.educationId = params['id'];
      

      // Get the work experience by ID

        this.educationService.getEducation(this.employeeIdService.employeeId).subscribe({
          next: (education) => {
            this.education = education;
        
            this.selectedEducationLevel = education.eductionName; // Use safe navigation operator
          },
          error: (response) => {
            console.log(response);
          }
        });
      })
      this.educationlevelservice.getAllEducationLevels()
      .subscribe({
        next: (educationlevels) => {
          this.educationlevels=educationlevels;
        },
        error(response){
          console.log(response)
        }
      });
      // Get the work experience by ID if it exists

       // Get all educations
       this.educationService.getAllEducation().subscribe({
        next: (educations) => {
          this.educations = educations;
        },
        error: (response) => {
          console.log(response);
        }
      });
  

  }

  updateEducation(): void { console.log(this.education)
    this.educationUpdated = true;
    this.education.eductionName = this.selectedEducationLevel;
    this.educationService.updateEducation(this.education, this.educationId).subscribe({
      next: () => {
        this.router.navigate(['/employee-registration/education']); 
       
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getEducationName(educationLevelId: string): string {
    const educationLevel = this.educationlevels.find((educationLevel) => educationLevel.id === educationLevelId);
    return educationLevel ? educationLevel.educationName : '';
  }


  editEducation(Education: Education): void {
    // Here, we will navigate to the edit page for the selected Education.
    this.router.navigate(['/edit-education', Education.id]);
  }

  deleteEducation(Education: Education): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.educationService.deleteEducation(Education.id).subscribe(
        () => {
         
          this.educations = this.educations.filter((t) => t.id !== Education.id);
          this.router.navigate(['employee-registration/education']);
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
         // alert('Failed to delete the Education. Please try again later.');
        }
        );
      }
    });
  }

  }
