import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkExperience } from 'app/models/work-experience.model';
import { WorkExperienceService } from 'app/service/work-experience.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrls: ['./edit-workexperience.component.css']
})
export class EditWorkexperienceComponent {

  workExperienceUpdated: boolean = false;

  workExperienceId: string;

  workExperience: WorkExperience = {
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
;
  workExperiences: WorkExperience[] = [];
  selectedEducationLevel: string = '';

  buttons = [
    { label: 'Add Employee', route: "/employee-registration" },
    { label: 'List Employee', route: "/employee-list" },
  ];

  constructor(
    private workExperienceService: WorkExperienceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.workExperienceId = params['id'].toString();
      // Get all work experiences
      this.workExperienceService.getAllWorkExperience().subscribe({
        next: (workExperience) => {
          this.workExperiences = workExperience.filter(workexperience => workexperience.empId === this.employeeIdService.employeeId);

        },
        error: (response) => {
          console.log(response);
        }
      });

        
      })
    
  }
  
  updateWorkExperience(): void {
    this.workExperienceUpdated = true;
    // Assuming the WorkExperienceService has a method to update work experience
    this.workExperienceService.updateWorkExperience(this.workExperience, this.workExperienceId).subscribe({
      next: () => {
        this.router.navigate(['employee-registration/work-experience']);
      },
      error: (response) => {
        console.log(response);
      }
    });
 
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

