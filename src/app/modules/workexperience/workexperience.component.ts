import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { WorkExperienceService } from 'app/service/work-experience.service';

@Component({
  selector: 'app-workexperience',
  templateUrl: './workexperience.component.html',
  styleUrls: ['./workexperience.component.css']
})
export class WorkexperienceComponent {

    workExperience: WorkExperience;
    workExperienceSaved: boolean = false;
    workExperiences: WorkExperience[] = [];
  
    buttons = [
      { label: ' Add Employee ', route: "/employee-registration" },
      { label: '  List Employee ', route: "/employee-list" },
    ];
  
    addWorkExperienceRequest: WorkExperience = {
      pId: 0,
      id: undefined,
      description: "",
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
      companyName: "",
      postionHeld: "",
      from: "",
      to: "",
      salary: 0,
      reasonTermination: "",
    };
  
   
    constructor(
      private workExperienceService: WorkExperienceService,
      private router: Router,
      private employeeIdService: EmployeeIdService,
    ) { }
  
    ngOnInit(): void {
  

  this.workExperienceService.getAllWorkExperience() 
    .subscribe({ 
      next: (workExperience) => { 
        this.workExperiences = workExperience; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
    }
  
    addWorkExperience() {
      this.addWorkExperienceRequest.empId = this.employeeIdService.employeeId;
      this.workExperienceService.addWorkExperience(this.addWorkExperienceRequest).subscribe({
        next: (employee) => {
          this.workExperienceSaved = true;
          setTimeout(() => {
            this.workExperienceSaved = false;
          }, 2000);
          // Add the current work experience to the array
          this.workExperiences.push({ ...this.addWorkExperienceRequest });
          // Reset the form fields
          this.addWorkExperienceRequest = {
            pId: 0,
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        
            description: "",
            createdBy: "",
            createdDate: "",
            updatedDate: "",
            updatedBy: "",
            status: 0,
            empId: "",
            companyName: "",
            postionHeld: "",
            from: "",
            to: "",
            salary: 0,
            reasonTermination: "",
          };
        },
        error(response) {
          console.log(response)
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
        this.workExperienceService.deleteWorkExperience(WorkExperience.id).subscribe(
          () => {
            // WorkExperience deleted successfully, we can update the list of WorkExperiences after deletion.
            // Here, we are simply filtering out the deleted WorkExperience from the WorkExperiences array.
            this.workExperiences = this.workExperiences.filter((t) => t.id !== WorkExperience.id);
    
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
  

