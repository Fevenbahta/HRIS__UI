
import { Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { WorkExperienceService } from 'app/service/work-experience.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component } from '@angular/core';


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
      private dialog: MatDialog

    ) { }
  
    ngOnInit(): void {
  

  this.workExperienceService.getWorkExperience(this.employeeIdService.employeeId) 
    .subscribe({ 
      next: (workExperience) => { 
        this.workExperience = workExperience; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
    }
  
    addWorkExperience() {
      this.addWorkExperienceRequest.empId = this.employeeIdService.employeeId;
      this.workExperienceService.addWorkExperience(this.addWorkExperienceRequest).subscribe({
        next: () => {
        //  this.router.navigate(['/employee-registration/training']); 
          setTimeout(() => {
            this.workExperienceSaved = false;
          }, 2000);
          // Add the current work experience to the array
          this.workExperienceService.getWorkExperience(this.employeeIdService.employeeId) 
          .subscribe({ 
            next: (workExperience) => { 
              this.workExperience = workExperience; 
                  }, 
            error(response) { 
              console.log(response); 
            }, 
        });
          this.workExperiences.push({ ...this.addWorkExperienceRequest });
          // Reset the form fields
          this.addWorkExperienceRequest = {
            pId: 0,
            id: undefined,
        
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
  

