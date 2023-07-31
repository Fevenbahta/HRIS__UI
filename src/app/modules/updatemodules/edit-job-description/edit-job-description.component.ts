import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePositionService } from 'app/service/employee-position';
import { EmployeePosition } from 'app/models/job-description.model';

@Component({
  selector: 'app-edit-job-description',
  templateUrl: './edit-job-description.component.html',
  styleUrls: ['./edit-job-description.component.css']
})
export class EditJobDescriptionComponent implements OnInit {
  employeePositionId: string;
  employeePosition: EmployeePosition;
  employeePositionUpdated: boolean = false;

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
  }
}
