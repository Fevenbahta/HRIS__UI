import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EducationLevel } from 'app/models/job-description.model';
import { Education } from 'app/models/work-experience.model';
import { EducationService } from 'app/service/education.service';
import { EducationLevelService } from 'app/service/educationlevel.service';
import { EmployeeIdService } from 'app/service/employee-id.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  education: Education;

  educationlevels:EducationLevel[]= [];
  selectedEducationLevel: string='';
  
  educationSaved: boolean = false;
  workExperienceSaved: boolean = false;

  educations: Education[] = [];
 

  buttons = [
    { label: ' Add Employee ', route: "/employee-registration" },
    { label: '  List Employee ', route: "/employee-list" },
  ];


  addEducationRequest: Education = {
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
  ) { }

  ngOnInit(): void {

    this.educationlevelservice.getAllEducationLevels()
.subscribe({
  next: (educationlevels) => {
    this.educationlevels=educationlevels;
  },
  error(response){
    console.log(response)
  }
});
this.educationservice.getAllEducation() 
  .subscribe({ 
    next: (education) => { 
      this.educations = education; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});

  }



  addEducation() {
    this.addEducationRequest.empId = this.employeeIdService.employeeId;
    this.addEducationRequest.eductionName = this.selectedEducationLevel;
    this.educationservice.addEducation(this.addEducationRequest).subscribe({
      next: (employee) => {
        this.educationSaved = true;
        setTimeout(() => {
          this.educationSaved = false;
        }, 2000);
        // Add the current education to the array
        this.educations.push({ ...this.addEducationRequest });
        // Reset the form fields
        this.addEducationRequest = {
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
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this Education?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the Education.
      this.educationservice.deleteEducation(Education.id).subscribe(
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