import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePositionService } from 'app/service/employee-position';
import { Branch, Division, EmployeePosition, Position, Step } from 'app/models/job-description.model';

@Component({
  selector: 'app-edit-job-description',
  templateUrl: './edit-job-description.component.html',
  styleUrls: ['./edit-job-description.component.css']
})
export class EditJobDescriptionComponent implements OnInit {
  employeePositionId: string;
  employeePosition: EmployeePosition;
  employeePositionUpdated: boolean = false;
  employeePositions:EmployeePosition[]=[];
  divisions:Division[]= [];
  selectedDivision: string='';
   positions:Position[]= [];
  selectedPosition: string='';
  branches:Branch[]= [];
  selectedBranch: string='';
 
  steps:Step[]= [];
  selectedStep: string='';
  employeePositionSaved: boolean = false;
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private employeePositionService: EmployeePositionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeePositionId = params['id'];
      this.employeePositionService.getEmployeePosition(this.employeePositionId).subscribe((employeePosition) => {
        this.employeePosition = employeePosition;
      });
    });
  }

  updateEmployeePosition(): void {
    this.employeePositionService.updateEmployeePosition(this.employeePosition, this.employeePositionId).subscribe({
      next: () => {
        this.employeePositionUpdated = true;
        setTimeout(() => {
          this.employeePositionUpdated = false;
        }, 2000);
      },
      error: (response) => {
        console.log(response);
      }
    });
    this.employeePositionSaved=true
  }
  editEmployeePosition(EmployeePosition: EmployeePosition): void {
    // Here, we will navigate to the edit page for the selected EmployeePosition.
    this.router.navigate(["/edit-EmployeePosition", EmployeePosition.id]);
  }
  deleteEmployeePosition(EmployeePosition: EmployeePosition): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this EmployeePosition?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the EmployeePosition.
      this.employeePositionService.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.employeePositions = this.employeePositions.filter((t) => t.id !== EmployeePosition.id);
  
          // You can also show a success message to the user.
          alert('EmployeePosition deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the EmployeePosition. Please try again later.');
        }
      );
    }
  }
  getDivisionName(divisionId: string): string {
    const division = this.divisions.find((division) => division.divisionId === divisionId);
    return division ? division.description : '';
  }

  getStepName(stepId: string): string {
    const step = this.steps.find((step) => step.id === stepId);
    return step ? step.description : '';
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : '';
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((position) => position.positionId === positionId);
    return position ? position.name : '';
  }
  
}
