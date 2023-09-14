import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'app/models/employee.model';
import { Grade, Position } from 'app/models/job-description.model';
import { Promotion } from 'app/models/vacancy/promotion.model';
import { EmployeeService } from 'app/service/employee.service';
import { GradeService } from 'app/service/grade.service';
import { PositionService } from 'app/service/position.service';
import { PromotionService } from 'app/service/promotion.service';

@Component({
  selector: 'app-promotionhistory',
  templateUrl: './promotionhistory.component.html',
  styleUrls: ['./promotionhistory.component.css']
})
export class PromotionhistoryComponent {
  buttons = [ 
    { label: 'Promotions ', route: '/promotionhistory' }, 
   { label: 'Vacancy Management', route: '/vacancymanagment' },  
   { label: ' Vacancy', route: '/vacancy' },
   { label: ' Approve Promotion', route: '/approvepromotion' },
 ];  
 Promotions:Promotion[]=[]
 employees:Employee[]=[];
 PromotionSaved: boolean = false;
  PromotionUpdated: boolean = false;
positions:Position[]=[];
grades:Grade[]=[];
 constructor( 

   private router: Router, 
   private dialog: MatDialog, 
   private PromotionService: PromotionService,
   private positionservice: PositionService,
   private gradeservice: GradeService,
   private employeeService:EmployeeService,

 ) {
    
 } 
 ngOnInit(): void { 
  this.employeeService.getAllEmployees() 
.subscribe({ 
  next: (employees) => { 
    this.employees=employees}})


    
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
getEmployeeName(empId: string): string { 
  const employee = this.employees.find((g) => g.empId === empId); 
  return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
} 
}
