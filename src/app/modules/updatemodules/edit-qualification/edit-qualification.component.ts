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
}
