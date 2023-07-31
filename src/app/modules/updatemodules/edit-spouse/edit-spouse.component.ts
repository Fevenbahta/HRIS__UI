// edit-spouse.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spouse } from 'app/models/spouse.model';
import { SpouseService } from 'app/service/spouse.service';

@Component({
  selector: 'app-edit-spouse',
  templateUrl: './edit-spouse.component.html',
  styleUrls: ['./edit-spouse.component.scss']
})
export class EditSpouseComponent implements OnInit {
  spouseId: number;
  spouse: Spouse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spouseService: SpouseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spouseId = +params['id'];
      this.getSpouseById();
    });
  }

  getSpouseById(): void {
    this.spouseService.getSpouse(this.spouseId).subscribe(
      (spouse) => {
        this.spouse = spouse;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateSpouse(): void {
    this.spouseService.updateSpouse(this.spouse, this.spouseId, ).subscribe(
      () => {
        // Spouse updated successfully, you can redirect to the spouse list or show a success message.
        this.router.navigate(['/spouse']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
