import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { Education } from 'app/models/work-experience.model';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';

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
 
    private route: ActivatedRoute,
    private router: Router,
    private educationlevelservice: EducationLevelService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.educationId = params['id'];
      

      // Get the work experience by ID

        this.educationService.getEducation(this.educationId).subscribe({
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
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Education?');

    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Education.
      this.educationService.deleteEducation(Education.id).subscribe(
        () => {
          // Education deleted successfully, we can update the list of Educations after deletion.
          // Here, we are simply filtering out the deleted Education from the Educations array.
          this.educations = this.educations.filter((t) => t.id !== Education.id);

          // You can also show a success message to the user.
          alert('Education deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the Education. Please try again later.');
        }
      );
    }
  }


}
