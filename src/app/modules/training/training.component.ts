
import { Router } from '@angular/router';
import { Training } from 'app/models/training.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { TrainingService } from 'app/service/training.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  trainingSaved: boolean = false;
  trainings: Training[] = [];


  training: Training = {
    pId: 0,
    id: undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
    empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
    typeOfTraining: "",
    from: "",
    to: "",
  
  };
 

  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' },
    {label:'Employee History', route:'/history'}
  ];
  constructor(
    private dialog: MatDialog ,
    private trainingService: TrainingService,
    private employeeIdService: EmployeeIdService,
    private router: Router,) { }

  ngOnInit(): void {
    this.trainingService.getAllTraining() 
    .subscribe({ 
      next: (training) => { 
        this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);

            }, 
      error(response) { 
        console.log(response); 
      }, 
  });

  }
  addTraining() {
    this.training.empId = this.employeeIdService.employeeId;
    this.trainingService.addTraining(this.training)
    .subscribe({
      next: (employee) => {
        this.trainingSaved = true;
          setTimeout(() => {
        this.trainingSaved = false;
      }, 2000);
      this.trainingService.getAllTraining() 
      .subscribe({ 
        next: (training) => { 
          this.trainings = training.filter(training => training.empId === this.employeeIdService.employeeId);
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
        // Add the current work experience to the array
        this.trainings.push({ ...this.training });
        // Reset the form fields
        this.training = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
          empId: "A3C5647E-0A7B-4CB2-A51C-064B23295DD9",
          typeOfTraining: "",
          from: "",
          to: "",
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

  editTraining(training: Training): void {
    // Here, we will navigate to the edit page for the selected training.
    this.router.navigate(['/edit-training', training.id]);

  }

  deleteTraining(training: Training): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px', // Set the desired width of the dialog
      data: { message: 'Are you sure you want to delete this training?' } // Pass any data you want to the delete confirmation component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // The result will be true if the user confirmed the deletion, otherwise false
      if (result === true) {
        // If the user confirmed the deletion, you can proceed with the delete logic here
        this.trainingService.deleteTraining(training.id).subscribe(
          () => {
            // Training deleted successfully, we can update the list of trainings after deletion.
            // Here, we are simply filtering out the deleted training from the trainings array.
            this.trainings = this.trainings.filter((t) => t.id !== training.id);
  
            // You can also show a success message to the user.
            console.log('Training deleted successfully!');
          },
          (error) => {
            console.error(error);
            // If there was an error during deletion, you can show an error message.
            console.log('Failed to delete the training. Please try again later.');
          }
        );
      }
    });
  }
  
}
