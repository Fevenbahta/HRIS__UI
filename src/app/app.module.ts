import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule } from '@angular/common/http';
import { BranchComponent } from './modules/Admin module/Job/branch/branch.component';
import { SupervisorComponent } from './modules/Admin module/Job/supervisor/supervisor.component';
import { EditContactComponent } from './modules/updatemodules/edit-contact/edit-contact.component';
import { EditJobDescriptionComponent } from './modules/updatemodules/edit-job-description/edit-job-description.component';
import { EditSpouseComponent } from './modules/updatemodules/edit-spouse/edit-spouse.component';
import { EditTrainingComponent } from './modules/updatemodules/edit-training/edit-training.component';
import { WorkexperienceComponent } from './modules/workexperience/workexperience.component';
import { EducationComponent } from './modules/education/education.component';
import { EditWorkexperienceComponent } from './modules/updatemodules/edit-workexperience/edit-workexperience.component';
import { EditEducationComponent } from './modules/updatemodules/edit-education/edit-education.component';
import { DeleteConfirmationComponent } from './modules/delete-confirmation/delete-confirmation.component';
import { EditNavComponent } from './modules/updatemodules/edit-nav/edit-nav.component';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import { HistoryComponent } from './modules/history/history.component';
import { LeaverequestComponent } from './modules/leave/leaverequest/leaverequest.component';
import { LeavetypeComponent } from './modules/Admin module/leavetype/leavetype.component';
import { LeavebalanceComponent } from './modules/leave/leavebalance/leavebalance.component';


import { LeaveApprovalComponent } from './modules/leave/leave-approval/leave-approval.component';
import { EmployeeLeavebalanceComponent } from './modules/leave/employee-leavebalance/employee-leavebalance.component';
import { EmployeeDetailsModalComponent } from './modules/leave/employee-details-modal/employee-details-modal.component';
import { VacancyComponent } from './modules/Promotion/vacancy/vacancy.component';
import { PromotionhistoryComponent } from './modules/Promotion/promotionhistory/promotionhistory.component';
import { VacancymanagmentComponent } from './modules/Promotion/vacancymanagment/vacancymanagment.component';
import { ActingAssigmentComponent } from './modules/acting-assigment/acting-assigment.component';
import { ApprovepromotionComponent } from './modules/Promotion/approvepromotion/approvepromotion.component';
import { HolidaysComponent } from './modules/Admin module/holidays/holidays.component';





@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
       HttpClientModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
