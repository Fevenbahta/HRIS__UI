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
  trainingId: number;
  training: Training;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.trainingId = +params['id'];
      this.getTrainingById();
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
        // Training updated successfully, you can redirect to the training list or show a success message.
        this.router.navigate(['/training']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

