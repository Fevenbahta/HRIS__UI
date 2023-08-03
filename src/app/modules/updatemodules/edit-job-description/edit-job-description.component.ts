import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePositionService } from 'app/service/employee-position';
import { Branch, Division, EmployeePosition, Position, Step } from 'app/models/job-description.model';
import { DivisionService } from 'app/service/division.service';
import { StepService } from 'app/service/step.service';
import { PositionService } from 'app/service/position.service';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { BranchService } from 'app/service/branch.service';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

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


  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private employeePositionService: EmployeePositionService,
    private route: ActivatedRoute,
    private router: Router,
    private divisionservice: DivisionService,
    private stepservice: StepService,
    private positionservice:PositionService ,
    private employeeIdService:EmployeeIdService,
    private branchservice:BranchService,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeePositionId = params['id'].toString();
      // this.getemployeePositionById()


      this.employeePositionService.getEmployeePosition(this.employeePositionId).subscribe((employeePosition) => {
        this.employeePosition = employeePosition;

        this.selectedDivision = employeePosition.divisionId;
        this.selectedPosition = employeePosition.position;
        this.selectedBranch = employeePosition.branchId;
        this.selectedStep = employeePosition.stepId;

        this.employeePositionService.getAllEmployeePosition().subscribe((employeePositions) => {
          this.employeePositions = employeePositions;
        });
      
        // Fetch the available divisions and populate the divisions array
        this.divisionservice.getAllDivisions().subscribe((divisions) => {
          this.divisions = divisions;
        });
      
        // Fetch the available positions and populate the positions array
        this.positionservice.getAllPosition().subscribe((positions) => {
          this.positions = positions;
        });
      
        // Fetch the available branches and populate the branches array
        this.branchservice.getAllBranch().subscribe((branches) => {
          this.branches = branches;
        });
      
        // Fetch the available steps and populate the steps array
        this.stepservice.getAllStep().subscribe((steps) => {
          this.steps = steps;
        });
      });
    });
  }
  getemployeePositionById(): void {
    this.employeePositionService.getEmployeePosition(this.employeePositionId).subscribe(
      (employeePosition) => {
        this.employeePosition = employeePosition;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateEmployeePosition(): void {
    this.employeePositionUpdated=true;
    this.employeePosition.divisionId = this.selectedDivision;
    this.employeePosition.position = this.selectedPosition;
    this.employeePosition.stepId = this.selectedStep;
    this.employeePosition.branchId = this.selectedBranch;
    this.employeePositionService.updateEmployeePosition(this.employeePosition, this.employeePositionId).subscribe({
      next: (employeePosition) => {
       
    this.router.navigate(['/employee-registration/job-description']);
  },
      error: (response) => {
        console.log(response);
      }
 
    });
 
  }
  editEmployeePosition(EmployeePosition: EmployeePosition): void {
    // Here, we will navigate to the edit page for the selected EmployeePosition.
    this.router.navigate(["/edit-employeePosition", EmployeePosition.id]);
  }
  deleteEmployeePosition(EmployeePosition: EmployeePosition): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // If the user confirms the deletion, we can call the service to delete the EmployeePosition.
      this.employeePositionService.deleteEmployeePosition(EmployeePosition.id).subscribe(
        () => {
          // EmployeePosition deleted successfully, we can update the list of EmployeePositions after deletion.
          // Here, we are simply filtering out the deleted EmployeePosition from the EmployeePositions array.
          this.employeePositions = this.employeePositions.filter((t) => t.id !== EmployeePosition.id);
  
          this.router.navigate(['employee-registration/job-description']);
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
  
)}

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
