import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'app/service/education.service';
import { WorkExperienceService } from 'app/service/work-experience.service';

import { Education, WorkExperience } from 'app/models/work-experience.model';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.css']
})
export class EditQualificationComponent implements OnInit {
  educationId: string;
  workExperienceId: string;
  education: Education;
  workExperience: WorkExperience;
  educationSaved: boolean = false;
  workExperienceSaved: boolean = false;
educations:Education[]=[];
workExperiences:WorkExperience[]=[]
  constructor(
    private educationService: EducationService,
    private workExperienceService: WorkExperienceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.educationId = params['educationId'];
      this.workExperienceId = params['workExperienceId'];

      // Fetch the education data using the ID
      this.educationService.getEducation(this.educationId).subscribe({
        next: (education) => {
          this.education = education;
        },
        error: (response) => {
          console.log(response);
        }
      });

      // Fetch the work experience data using the ID
      this.workExperienceService.getWorkExperience(this.workExperienceId).subscribe({
        next: (workExperience) => {
          this.workExperience = workExperience;
        },
        error: (response) => {
          console.log(response);
        }
      });
    });
  }

  updateEducation(): void {
    // Assuming the EducationService has a method to update education
    this.educationService.updateEducation(this.education,this.educationId).subscribe({
      next: () => {
        this.educationSaved = true;
        setTimeout(() => {
          this.educationSaved = false;
        }, 2000);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  updateWorkExperience(): void {
    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience,this.workExperienceId).subscribe({
      next: () => {
        this.workExperienceSaved = true;
        setTimeout(() => {
          this.workExperienceSaved = false;
        }, 2000);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
  editEducation(Education: Education): void {
    // Here, we will navigate to the edit page for the selected Education.
    this.router.navigate(['/edit-Education', Education.id]);
  }
  deleteEducation(Education: Education): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Education?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Education.
      this.educationService.deleteEducation(this.education.id).subscribe(
        () => {
          // Education deleted successfully, we can update the list of Educations after deletion.
          // Here, we are simply filtering out the deleted Education from the Educations array.
          this.educations = this.educations.filter((t) => t.id !== this.education.id);
  
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

  editWorkExperience(WorkExperience: WorkExperience): void {
    // Here, we will navigate to the edit page for the selected WorkExperience.
    this.router.navigate(['/edit-WorkExperience', WorkExperience.id]);
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


