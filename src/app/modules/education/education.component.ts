import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { Education } from 'app/models/work-experience.model';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
 

  educationlevels:EducationLevel[]= [];
  selectedEducationLevel: string='';
  
  educationSaved: boolean = false;
  workExperienceSaved: boolean = false;

  educations: Education[] = [];
 

  buttons = [
    { label: ' Add Employee ', route: "/employee-registration" },
    { label: '  List Employee ', route: "/employee-list" },
  ];


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

  constructor(

    private educationservice: EducationService,
    private router: Router,
    private educationlevelservice:EducationLevelService,
    private employeeIdService: EmployeeIdService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.educationservice.getAllEducation().subscribe({
      next: (educations) => {
        this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
        ;
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

  addEducation() {
    this.education.empId = this.employeeIdService.employeeId;
    this.education.eductionName = this.selectedEducationLevel;
    this.educationservice.addEducation(this.education).subscribe({
      next: (employee) => {
        
      //  this.router.navigate(['/employee-registration/work-experience']); 

      this.educationSaved=true
        setTimeout(() => {
          this.educationSaved = false;
        }, 2000);
        this.educationservice.getAllEducation().subscribe({
          next: (educations) => {
            this.educations = educations.filter(education => education.empId === this.employeeIdService.employeeId);
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        // Add the current education to the array
        this.educations.push({ ...this.education });
        // Reset the form fields
        this.education = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-25T14:10:21.467Z",
          updatedDate: "2023-07-25T14:10:21.467Z",
          updatedBy: "",
          status: 0,
          empId: "EED0DACB-73D6-4CC9-9526-269A2921106E",
          from: '',
          to: "",
          nameOfInstitute: '',
          fieldOfStudy: '',
          eductionName: '',
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

  editEducation(education: Education): void {
    // Here, we will navigate to the edit page for the selected Education.
    this.router.navigate(['/edit-education', education.id]);
  }
  deleteEducation(Education: Education): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      this.educationservice.deleteEducation(Education.id).subscribe(
        () => {
         
          this.educations = this.educations.filter((t) => t.id !== Education.id);

          // You can also show a success message to the user.
          //alert('Education deleted successfully!');
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
