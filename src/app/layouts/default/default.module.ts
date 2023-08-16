
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatPseudoCheckbox, MatPseudoCheckboxModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



import { EmployeeRegistrationComponent } from 'app/modules/employee-registration/employee-registration.component';

import { SharedModule } from 'app/shared/shared.module';
import { DefaultComponent } from './default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MinNavComponent } from 'app/modules/nav/min-nav/min-nav.component';
import { EmployeeService } from 'app/service/employee.service';
import { ContactComponent } from 'app/modules/contact/contact.component';
import { JobdescriptionComponent } from 'app/modules/jobdescription/jobdescription.component';
import { SharedNavComponent } from 'app/modules/Admin module/shared-nav/shared-nav.component';
import { AdminComponent } from 'app/modules/Admin module/admin/admin.component';
import { EducationLevelComponent } from 'app/modules/Admin module/education-level/education-level.component';
import { PositionComponent } from 'app/modules/Admin module/Job/position/position.component';
import { StepComponent } from 'app/modules/Admin module/Job/step/step.component';
import { GradeComponent } from 'app/modules/Admin module/Job/grade/grade.component';
import { BranchComponent } from 'app/modules/Admin module/Job/branch/branch.component';
import { SupervisorComponent } from 'app/modules/Admin module/Job/supervisor/supervisor.component';
import { EmployeeListComponent } from 'app/modules/employee-list/employee-list.component';
import { QualificationComponent } from 'app/modules/qualification/qualification.component';
import { SpouseComponent } from 'app/modules/spouse/spouse.component';
import { TrainingComponent } from 'app/modules/training/training.component';
import { EmergencycontactComponent } from 'app/modules/emergencycontact/emergencycontact.component';
import { DepositeAuthenticationComponent } from 'app/modules/deposite-authenticaton/deposite-authenticaton.component';
import { EditEmployeeComponent } from 'app/modules/updatemodules/edit-employee/edit-employee.component';
import { EditContactComponent } from 'app/modules/updatemodules/edit-contact/edit-contact.component';
import { EditSpouseComponent } from 'app/modules/updatemodules/edit-spouse/edit-spouse.component';
import { EditJobDescriptionComponent } from 'app/modules/updatemodules/edit-job-description/edit-job-description.component';
import { EditTrainingComponent } from 'app/modules/updatemodules/edit-training/edit-training.component';
import { EditDepositeAuthenticationComponent } from 'app/modules/updatemodules/edit-depositeauthentication/edit-depositeauthentication.component';
import { EditQualificationComponent } from 'app/modules/updatemodules/edit-qualification/edit-qualification.component';
import { WorkexperienceComponent } from 'app/modules/workexperience/workexperience.component';
import { EducationComponent } from 'app/modules/education/education.component';
import { EditWorkexperienceComponent } from 'app/modules/updatemodules/edit-workexperience/edit-workexperience.component';
import { EditEducationComponent } from 'app/modules/updatemodules/edit-education/edit-education.component';
import { DeleteConfirmationComponent } from 'app/modules/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmergencyContactComponent } from 'app/modules/updatemodules/edit-emergencycontact/edit-emergencycontact.component';
import { MatIconModule } from '@angular/material/icon';
import { EditNavComponent } from 'app/modules/updatemodules/edit-nav/edit-nav.component';
import { AssignSupervisorComponent } from 'app/modules/Admin module/Job/assign-supervisor/assign-supervisor.component';
import { HistoryComponent } from 'app/modules/history/history.component';

@NgModule({
  declarations: [
    DefaultComponent,
     DashboardComponent,
   EmployeeRegistrationComponent,
   ContactComponent,
   JobdescriptionComponent,
    MinNavComponent,
    SharedNavComponent,
    AdminComponent,
    EducationLevelComponent,
    PositionComponent,
    StepComponent,
    GradeComponent,
    BranchComponent,
    SupervisorComponent,
EmployeeListComponent,
QualificationComponent,
SpouseComponent,
TrainingComponent,
SpouseComponent,
EmergencycontactComponent,
DepositeAuthenticationComponent,
EditEmployeeComponent,
EditContactComponent,

EditSpouseComponent,
EditJobDescriptionComponent,
EditTrainingComponent,
EditDepositeAuthenticationComponent,
EditEmergencyContactComponent,
EditQualificationComponent,
WorkexperienceComponent,
    EducationComponent,
    EditWorkexperienceComponent,
    EditEducationComponent,
    DeleteConfirmationComponent,
EditNavComponent,
AssignSupervisorComponent,
HistoryComponent,


  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
 MatPseudoCheckboxModule,
 MatNativeDateModule,
 MatDatepickerModule,
 MatSlideToggleModule,
 MatMenuModule,
 MatSidenavModule,
 MatDividerModule,
 FlexLayoutModule,
 MatCardModule,
 MatPaginatorModule,
 MatTableModule,
 SharedModule,
 MatDialogModule,
 MatIconModule

  ],

providers: [

  EmployeeService
],

})
export class DefaultModule { }
