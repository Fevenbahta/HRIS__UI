// edit-spouse.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Spouse } from 'app/models/spouse.model';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-edit-spouse',
  templateUrl: './edit-spouse.component.html',
  styleUrls: ['./edit-spouse.component.scss']
})
export class EditSpouseComponent implements OnInit {
  spouseId: string;
  spouse: Spouse= {
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

  spouses:Spouse[]=[]
 spouseUpdated: boolean = false;
 spouseSaved:boolean = false;
  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spouseService: SpouseService,
    private dialog: MatDialog,
    private employeeIdService:EmployeeIdService

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spouseId = params['id'],toString();
    });

    this.spouseService.getAllSpouse() 
    .subscribe({ 
      next: (spouse) => { 
        this.spouses = spouse.filter(spouse => spouse.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, })
    
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
  deleteSpouse(Spouse: Spouse): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
  
    if (result) {
      // If the user confirms the deletion, we can call the service to delete the Spouse.
      this.spouseService.deleteSpouse(this.spouse.id).subscribe(
        () => {
          // Spouse deleted successfully, we can update the list of Spouses after deletion.
          // Here, we are simply filtering out the deleted Spouse from the Spouses array.
          this.spouses = this.spouses.filter((t) => t.id !== this.spouse.id);
  
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


addSpouse() {
  this.spouse.empId = this.employeeIdService.employeeId
  this.spouseService.addSpouse(this.spouse).subscribe({
    next: (employee) => {
      this.spouseSaved = true;
    //  this.router.navigate(['employee-registration/job-description']);
      setTimeout(() => {
        this.spouseSaved = false;
      }, 2000);
      this.spouses.push({ ...this.spouse });

      this.spouse = {
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
}
