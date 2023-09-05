
import { Router } from '@angular/router';
import { Spouse } from 'app/models/spouse.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { SpouseService } from 'app/service/spouse.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DeletesucessfullmessageComponent } from 'app/deletesucessfullmessage/deletesucessfullmessage.component';

@Component({
  selector: 'app-spouse',
  templateUrl: './spouse.component.html',
  styleUrls: ['./spouse.component.css']
})
export class SpouseComponent implements OnInit {

  spouseSaved: boolean = false;
  spouses: Spouse[] = []; 
  spouseUpdated:boolean =false;
  spouse: Spouse = {
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
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  ngOnInit(): void {
            
    this.spouseService.getSpouse(this.employeeIdService.employeeId)
    .subscribe({ 
      next: (spouses) => { 
        this.spouse = spouses; 
            }, 
      error(response) { 
        console.log(response); 
      }, 
  });
    // this.spouseService.getAllSpouse() 
    // .subscribe({ 
    //   next: (spouse) => { 
    //     this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);

    //         }, 
    //   error(response) { 
    //     console.log(response); 
    //   }, })
  }
  addSpouse() {
    this.spouse.empId = this.employeeIdService.employeeId
    this.spouseService.addSpouse(this.spouse).subscribe({
      next: (employee) => {
        this.spouseSaved = true;
      
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
        this.spouses.push({ ...this.spouse });

        this.spouse = {
          pId: 0,
          id: this.spouse.id,
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
  
  updateSpouse(): void {
    this.spouseService.updateSpouse(this.spouse, this.spouse.id).subscribe(
      () => {
   
        this.spouseUpdated = true;
        //  this.router.navigate(['employee-registration/job-description']);
          setTimeout(() => {
            this.spouseUpdated= false;
          }, 2000);

          this.spouseService.getAllSpouse() 
          .subscribe({ 
            next: (spouse) => { 
              this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);
      
                  }, 
            error(response) { 
              console.log(response); 
            }, })

          this.spouses.push({ ...this.spouse });
      },
      (error) => {
        console.error(error);
      }
    );
    this.spouse= {
      pId: 0,
      id: undefined,
      name: "",
      createdBy: "",
      createdDate: "2023-07-26T06:13:52.512Z",
      updatedDate: "2023-07-26T06:13:52.512Z",
      updatedBy: "",
      status: 0,
      empId: " ",
     dateOfBirth:" ",
    relationship: '',
  
    };
  
  }
  editSpouse(spouse: Spouse): void {
    // Here, we will navigate to the edit page for the selected Spouse.
    const contactToEdit = this.spouses.find(contact => contact.id === spouse.id);
    this.spouse = contactToEdit;
  }

  deleteSpouse(spouse: Spouse): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
  
    if (result===true) {
      // If the user confirms the deletion, we can call the service to delete the Spouse.
      this.spouseService.deleteSpouse(spouse.id).subscribe(
        () => {
          this.dialog.open(DeletesucessfullmessageComponent)
          this.spouseService.getAllSpouse() 
          .subscribe({ 
            next: (spouse) => { 
              this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);
      
                  }, 
            error(response) { 
              console.log(response); 
            }, })

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
