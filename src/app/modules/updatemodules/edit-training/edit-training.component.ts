// edit-training.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'app/models/training.model';
import { TrainingService } from 'app/service/training.service';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  trainingId: string;
  training: Training;
  trainingSaved: boolean = false;
  trainings:Training[]=[]

  buttons = [
    { label: ' Add Employee ', route: '/employee-registration' },
    { label: '  List Employee ', route: '/employee-list' }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.trainingId = params['id'].toString();
      this.getTrainingById();
      
    });
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

  getTrainingById(): void {
    this.trainingService.getTraining(this.trainingId).subscribe(
      (training) => {
        this.training = training;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateTraining(): void {
    this.trainingService.updateTraining(this.training,this.trainingId).subscribe(
      () => {
        this.trainingSaved=true;
        this.router.navigate(['/employee-registration/training']); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editTraining(training: Training): void {
    // Here, we will navigate to the edit page for the selected training.
    this.router.navigate(["/edit-training", training.id]);
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
          this.router.navigate(['/employee-registration/training']); 
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

