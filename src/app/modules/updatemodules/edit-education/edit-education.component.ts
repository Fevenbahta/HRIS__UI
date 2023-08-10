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
  education: Education = {
    pId: 0,
    id:undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: undefined,
    from: '',
    to: "",
    nameOfInstitute: '',
    fieldOfStudy: '',
    eductionName: '',
  };
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
          this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
          ;
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


  editEducation(education: Education): void {
    const educationToEdit = this.educations.find(education => education.id === education.id);
    this.education = educationToEdit;
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
