import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Grade, Position } from 'app/models/job-description.model';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { VacancyService } from 'app/service/vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent {

  vacancies:Vacancy[]=[]

  vacancySaved: boolean = false;
   vacancyUpdated: boolean = false;
   promotionRelationSaved:boolean = false;
 positions:Position[]=[];
 grades:Grade[]=[];
  constructor( 
 
    private router: Router, 
    private dialog: MatDialog, 
    private vacancyService: VacancyService,
    private positionservice: PositionService,
    private gradeservice: GradeService,
    private promotionRelationService:PromotionRelationService

  ) {
     
  } 
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   
   { label: ' Approve Promotion', route: '/approvepromotion' },

 ];  

 promotionRelation: PromotionRelation = {
  pId: 0,
  id: undefined,
  createdBy: "",
  createdDate: "2023-07-26T06:13:52.512Z",
  updatedDate: "2023-07-26T06:13:52.512Z",
  updatedBy: "",
  status: 0,
vacancyId:undefined,
empId:"",
approvedDate: "2023-09-13T07:12:00.970Z",
promotionStatus: "pendding",


};

  ngOnInit(): void { 
    
    this.vacancyService.getAllVacancy()
    .subscribe({
      next: (vacancy) => {
        this.vacancies=vacancy;
      },
      error(response){
        console.log(response)
      }
    });
    
    this.positionservice.getAllPosition()
    .subscribe({
      next: (positions) => {
        this.positions=positions;
      },
      error(response){
        console.log(response)
      }
    });
    this.gradeservice.getAllGrade()
    .subscribe({
      next: (grades) => {
        this.grades=grades;
      },
      error(response){
        console.log(response)
      }
    });
  
  }
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  getPositionName(positionId: string): string {
    const position = this.positions.find((g) => g.positionId === positionId);
    return position ? position.name : 'Unknown Grade';
  }
  getGradeName(levelId: string): string {
    const grade = this.grades.find((g) => g.levelId === levelId);
    return grade ? grade.description : 'Unknown Grade';
  }
  apply(vacancy :Vacancy){
  this.promotionRelation.empId="4fe71f64-011a-4eca-af24-335119565c56";
  this.promotionRelation.vacancyId=vacancy.vacancyId;

    this.promotionRelationService.addPromotionRelation(this.promotionRelation)
    .subscribe({
      next: (employee) => {
        this.promotionRelationSaved = true;
          setTimeout(() => {
        this.promotionRelationSaved = false;
      }, 2000);
     

  
        this.promotionRelation = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
        vacancyId:undefined,
        empId:"",
        approvedDate: "2023-09-13T07:12:00.970Z",
        promotionStatus: "pendding",
        };
      },
      error(response) {
        console.log(response)
      }
    });
  }

}
