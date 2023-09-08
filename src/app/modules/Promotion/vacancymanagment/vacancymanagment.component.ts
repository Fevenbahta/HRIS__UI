import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { VacancyService } from 'app/service/vacancy.service';

@Component({
  selector: 'app-vacancymanagment',
  templateUrl: './vacancymanagment.component.html',
  styleUrls: ['./vacancymanagment.component.scss']
})
export class VacancymanagmentComponent {
  showVacancyForm: boolean = false;
 vacancies:Vacancy[]=[]
 vacancySaved: boolean = false;
  vacancyUpdated: boolean = false;



  vacancy: Vacancy = {
    pId: 0,
    id: undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
releaseDate:"",
deadline:"",
positionId:"",
levelId:"",
title:"",
requirement:"",
vacancyId:""
  
  };
  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private dialog: MatDialog, 
    private vacancyService: VacancyService,
 
  ) {
     
  } 

 
 
  ngOnInit(): void { 
  }

  buttons = [  
    { label: 'Vacancy Management', route: '/vacancymanagment' },  
    { label: ' Vacancy', route: '/vacancy' },
    { label: 'Promotions ', route: '/promotionhistory' }, 

 
  ];  
  toggleVacancyForm() {
    this.showVacancyForm = !this.showVacancyForm;
  }

  addVacancy() {

    this.vacancyService.addVacancy(this.vacancy)
    .subscribe({
      next: (employee) => {
        this.vacancySaved = true;
          setTimeout(() => {
        this.vacancySaved = false;
      }, 2000);
      this.vacancyService.getAllVacancy() 
      .subscribe({ 
        next: (vacancy) => { 
          this.vacancies = vacancy;
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
        // Add the current work experience to the array
        this.vacancies.push({ ...this.vacancy });
        // Reset the form fields
        this.vacancy = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
      releaseDate:"",
      deadline:"",
      positionId:"",
      levelId:"",
      title:"",
      requirement:"",
      vacancyId:""
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }
updatevacancy(){
  this.vacancyService.updateVacancy(this.vacancy,this.vacancy.id).subscribe(
    () => {       this.vacancyUpdated=true; 
      setTimeout(() => {
        this.vacancyUpdated=false; 
      }, 2000);

      this.vacancyService.getAllVacancy() 
      .subscribe({ 
        next: (vacancy) => { 
          this.vacancies = vacancy;
  
              }, 
        error(response) { 
          console.log(response); 
        }, 
    });
    },
    (error) => {
      console.error(error);
    }
  );
  this.vacancy = {
    pId: 0,
    id: undefined,
    createdBy: "",
    createdDate: "2023-07-26T06:13:52.512Z",
    updatedDate: "2023-07-26T06:13:52.512Z",
    updatedBy: "",
    status: 0,
releaseDate:"",
deadline:"",
positionId:"",
levelId:"",
title:"",
requirement:"",
vacancyId:""
  
  };
}
  
}
