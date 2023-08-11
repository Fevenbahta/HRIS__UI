
import { Router } from '@angular/router';
import { Spouse } from 'app/models/spouse.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { SpouseService } from 'app/service/spouse.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spouse',
  templateUrl: './spouse.component.html',
  styleUrls: ['./spouse.component.scss']
})
export class SpouseComponent implements OnInit {

  spouseSaved: boolean = false;
  spouses: Spouse[] = []; 
 spouse : Spouse;
  addSpouseRequest: Spouse = {
    pId: 0,
    id: undefined,
    name: "",
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
  dateOfBirth:"",
  relationship: '',

  };


  constructor(
    private spouseService:SpouseService,
    private employeeIdService: EmployeeIdService,
    private router: Router,
    private dialog: MatDialog) { }
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  ngOnInit(): void {
    this.spouseService.getAllSpouse() 
    .subscribe({ 
      next: (spouse) => { 
        this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, })
  }
  addSpouse() {
    this.addSpouseRequest.empId = this.employeeIdService.employeeId
    this.spouseService.addSpouse(this.addSpouseRequest).subscribe({
      next: (employee) => {
        this.spouseSaved = true;
      //  this.router.navigate(['employee-registration/job-description']);
        setTimeout(() => {
          this.spouseSaved = false;
        }, 2000);
        this.spouseService.getAllSpouse() 
    .subscribe({ 
      next: (spouse) => { 
        this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, })
        this.spouses.push({ ...this.addSpouseRequest });

        this.addSpouseRequest = {
          pId: 0,
          id: undefined,
          name: "",
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
         dateOfBirth:"2023-07-26T06:33:36.714Z",
        relationship: '',
      
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }
  editSpouse(spouse: Spouse): void {
    // Here, we will navigate to the edit page for the selected Spouse.
    this.router.navigate(['/edit-spouse', spouse.id]);
  }
  deleteSpouse(spouse: Spouse): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
  
    if (result===true) {
      // If the user confirms the deletion, we can call the service to delete the Spouse.
      this.spouseService.deleteSpouse(spouse.id).subscribe(
        () => {
          // Spouse deleted successfully, we can update the list of Spouses after deletion.
          // Here, we are simply filtering out the deleted Spouse from the Spouses array.
          this.spouses = this.spouses.filter((t) => t.id !== spouse.id);
     
          // You can also show a success message to the user.
          alert('Spouse deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the Spouse. Please try again later.');
        }
      );
    }
  }
)}
}
