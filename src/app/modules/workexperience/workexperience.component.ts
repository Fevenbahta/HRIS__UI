
import { Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { WorkExperienceService } from 'app/service/work-experience.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { Component } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';


@Component({
  selector: 'app-workexperience',
  templateUrl: './workexperience.component.html',
  styleUrls: ['./workexperience.component.css']
})
export class WorkexperienceComponent {


    workExperienceSaved: boolean = false;
    workExperienceUpdated: boolean = false;
    workExperiences: WorkExperience[] = [];
  
    buttons = [
      { label: ' Add Employee ', route: "/employee-registration" },
      { label: '  List Employee ', route: "/employee-list" },
      {label:'Employee History', route:'/history'}
    ];
  
    workExperience: WorkExperience = {
      pId: 0,
      id: undefined,

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
  

  this.workExperienceService.getAllWorkExperience()
.subscribe({
  next: (workexperience) => {
    // Filter emergency contacts for the current employee
    this.workExperiences = workexperience.filter(workExperience => workExperience.empId === this.employeeIdService.employeeId);
  },
  error(response) {
    console.log(response);
  },
});
    }
  
    addWorkExperience() {
      this.workExperience.empId = this.employeeIdService.employeeId;
      this.workExperienceService.addWorkExperience(this.workExperience).subscribe({
        next: () => {
        //  this.router.navigate(['/employee-registration/training']); 
        this.workExperienceSaved = true;
          setTimeout(() => {
            this.workExperienceSaved = false;
          }, 2000);
          // Add the current work experience to the array
        
  this.workExperienceService.getAllWorkExperience()
  .subscribe({
    next: (workexperience) => {
      // Filter emergency contacts for the current employee
      this.workExperiences = workexperience.filter(workExperience => workExperience.empId === this.employeeIdService.employeeId);
    },
    error(response) {
      console.log(response);
    },
  });
          this.workExperiences.push({ ...this.workExperience });
          // Reset the form fields
          this.workExperience = {
            pId: 0,
            id: undefined,
        
           
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
  
  updateWorkExperience(): void {

    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience, this.workExperience.id).subscribe({
      next: () => {    this.workExperienceUpdated = true;
        setTimeout(() => {
          this.workExperienceUpdated = false;
        }, 2000);
        this.workExperienceService.getAllWorkExperience().subscribe({
          next: (workExperience) => {
            this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);
  
          },
          error: (response) => {
            console.log(response);
          }
        });
      },

      
      error: (response) => {
        console.log(response);
      }
    });
 
    this.workExperience = {
      pId: 0,
      id: undefined,
 
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
  }

  editWorkExperience(WorkExperience: WorkExperience): void {
    const contactToEdit = this.workExperiences.find(workExperience => workExperience.id === workExperience.id);
    this.workExperience = contactToEdit;
  }
    deleteWorkExperience(workExperience: WorkExperience): void {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          // User confirmed the delete action, proceed with deletion
          this.workExperienceService.deleteWorkExperience(workExperience.id).subscribe(
            () => {
              this.dialog.open(DeletesucessfullmessageComponent)
              this.workExperienceService.getAllWorkExperience().subscribe({
                next: (workExperience) => {
                  this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);
        
                },
                error: (response) => {
                  console.log(response);
                }
              });
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
  

