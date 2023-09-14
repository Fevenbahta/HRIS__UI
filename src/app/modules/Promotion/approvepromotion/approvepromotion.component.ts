import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { Grade, Position } from 'app/models/job-description.model';
import { Promotion, PromotionRelation } from 'app/models/vacancy/promotion.model';
import { Vacancy } from 'app/models/vacancy/vacancy.model';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionService } from 'app/service/promotion.service';
import { PromotionRelationService } from 'app/service/promotionrelation.service';
import { VacancyService } from 'app/service/vacancy.service';

@Component({
  selector: 'app-approvepromotion',
  templateUrl: './approvepromotion.component.html',
  styleUrls: ['./approvepromotion.component.css']
})
export class ApprovepromotionComponent {
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   
   { label: ' Approve Promotion', route: '/approvepromotion' },
 ]; 


 Promotions:Promotion[]=[]
 employees:Employee[]=[];
 PromotionApproved: boolean = false;
 promotionSaved:boolean = false;

positions:Position[]=[];
grades:Grade[]=[];
promotionStatus="pendding"
promotionRelationPenddings:PromotionRelation[]=[]
showPromotionForm: boolean = false;
vacancies:Vacancy[]=[]
selectedDate:string;
promotion: Promotion = {
  pId: 0,
  id: undefined,
  createdBy: "",
  createdDate: "2023-07-26T06:13:52.512Z",
  updatedDate: "2023-07-26T06:13:52.512Z",
  updatedBy: "",
  status: 0,
vacancyId:undefined,
empId:"",
positionId: '',
levelId: '',
startDate: '',



};
 constructor( 

   private router: Router, 
   private dialog: MatDialog, 
   private PromotionService: PromotionService,
   private PromotionRelationService: PromotionRelationService,
   private positionservice: PositionService,
   private gradeservice: GradeService,
   private employeeService:EmployeeService,
   private vacancyService: VacancyService,
 ) {
    
 } 
 selectedPromotionRelationPending: any; 
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
  this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    this.employees=employees}})

    this.PromotionRelationService.getpromotionRelationByStatus(this.promotionStatus).subscribe({
      next: (promotionRelationPendding) => {
        this.promotionRelationPenddings = promotionRelationPendding
        ;
      },
      error: (response) => {
        console.log(response);
      }
    });
    
  this.PromotionService.getAllPromotion()
  .subscribe({
    next: (Promotion) => {
      this.Promotions=Promotion;
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


 getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
getTitle(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? `${vacancy.title}`:'Unknown '; 

}
getPosition(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? `${vacancy.positionId}`:'Unknown '; 

}
getLevel(vacancyId:string)
{
  const vacancy = this.vacancies.find((g) => g.vacancyId === vacancyId); 
  return vacancy ? `${vacancy.levelId}`:'Unknown '; 

}
approvePromotionPendding(){
  var promotionRelation=this.selectedPromotionRelationPending
    
  var Id=promotionRelation.id
  promotionRelation.promotionStatus="Promoted"
 
  this.PromotionRelationService
  .updatePromotionRelation(promotionRelation,Id)
  .subscribe(() =>{
    this.PromotionApproved = true;
console.log("updated")
      setTimeout(() => {
        this.PromotionApproved= false;
      }, 2000);

    
      this.vacancyService.getAllVacancy()
      .subscribe({
        next: (vacancy) => {
          this.vacancies=vacancy;
        },
        error(response){
          console.log(response)
        }
      });
      this.employeeService.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.employees=employees}})
    
        this.PromotionRelationService.getpromotionRelationByStatus(this.promotionStatus).subscribe({
          next: (promotionRelationPendding) => {
            this.promotionRelationPenddings = promotionRelationPendding
            ;
          },
          error: (response) => {
            console.log(response);
          }
        });
        
      this.PromotionService.getAllPromotion()
      .subscribe({
        next: (Promotion) => {
          this.Promotions=Promotion;
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
      
  });
}
togglePromotionForm(promotionRelationPending) {
  this.showPromotionForm = !this.showPromotionForm;
  this.selectedPromotionRelationPending = promotionRelationPending;

}
addPromotion(){
  if (this.selectedPromotionRelationPending) {

  this.promotion.startDate=this.selectedDate;

  this.promotion.empId=this.selectedPromotionRelationPending.empId;
  this.promotion.vacancyId=this.selectedPromotionRelationPending.vacancyId;
  this.promotion.positionId=this.getPosition(this.selectedPromotionRelationPending.vacancyId);
  this.promotion.levelId=this.getLevel(this.selectedPromotionRelationPending.vacancyId);

    this.PromotionService.addPromotion(this.promotion)
    .subscribe({
      next: (employee) => {
        this.promotionSaved = true;
          setTimeout(() => {
        this.promotionSaved = false;
      }, 2000);
     

  
        this.promotion = {
          pId: 0,
          id: undefined,
          createdBy: "",
          createdDate: "2023-07-26T06:13:52.512Z",
          updatedDate: "2023-07-26T06:13:52.512Z",
          updatedBy: "",
          status: 0,
        vacancyId:undefined,
        empId:"",
        positionId: '',
        levelId: '',
        startDate: '',
        };
      },
      error(response) {
        console.log(response)
      }
    });
    this.showPromotionForm = false;
  }}
}
