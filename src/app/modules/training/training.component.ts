import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'app/models/training.model';
import { EmployeeIdService } from 'app/service/employee-id.service';
import { TrainingService } from 'app/service/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  trainingSaved: boolean = false;
  trainings: Training[] = [];

  addTrainingRequest: Training = {
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
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private trainingService: TrainingService,
    private employeeIdService: EmployeeIdService,
    private router: Router,) { }

  ngOnInit(): void {
    this.trainingService.getAllTraining() 
  .subscribe({ 
    next: (trainings) => { 
      this.trainings = trainings; 
          }, 
    error(response) { 
      console.log(response); 
    }, 
});

  }
  addTraining() {
    this.addTrainingRequest.empId = this.employeeIdService.employeeId;
    this.trainingService.addTraining(this.addTrainingRequest)
    .subscribe({
      next: (employee) => {
        this.trainingSaved = true;
          setTimeout(() => {
        this.trainingSaved = false;
      }, 2000);
        // Add the current work experience to the array
        this.trainings.push({ ...this.addTrainingRequest });
        // Reset the form fields
        this.addTrainingRequest = {
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
       console.log("hhhhhhhhh") // Here, we will navigate to the edit page for the selected training.
    this.router.navigate(['/edit-training', training.id]);

  }

  deleteTraining(training: Training): void {
    // Here, we can show a confirmation dialog/modal to confirm the deletion.
    const confirmDelete = confirm('Are you sure you want to delete this training?');
  
    if (confirmDelete) {
      // If the user confirms the deletion, we can call the service to delete the training.
      this.trainingService.deleteTraining(training.id).subscribe(
        () => {
          // Training deleted successfully, we can update the list of trainings after deletion.
          // Here, we are simply filtering out the deleted training from the trainings array.
          this.trainings = this.trainings.filter((t) => t.id !== training.id);
  
          // You can also show a success message to the user.
          alert('Training deleted successfully!');
        },
        (error) => {
          console.error(error);
          // If there was an error during deletion, you can show an error message.
          alert('Failed to delete the training. Please try again later.');
        }
      );
    }
  }
  
}