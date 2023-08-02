import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './modules/employee-registration/employee-registration.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ContactComponent } from './modules/contact/contact.component';
import { JobdescriptionComponent } from './modules/jobdescription/jobdescription.component';
import { PositionComponent } from './modules/Admin module/Job/position/position.component';
import { StepComponent } from './modules/Admin module/Job/step/step.component';
import { GradeComponent } from './modules/Admin module/Job/grade/grade.component';
import { EducationLevelComponent } from './modules/Admin module/education-level/education-level.component';
import { BranchComponent } from './modules/Admin module/Job/branch/branch.component';
import { SupervisorComponent } from './modules/Admin module/Job/supervisor/supervisor.component';
import { EmployeeListComponent } from './modules/employee-list/employee-list.component';
import { QualificationComponent } from './modules/qualification/qualification.component';
import { SpouseComponent } from './modules/spouse/spouse.component';
import { TrainingComponent } from './modules/training/training.component';
import { EmergencycontactComponent } from './modules/emergencycontact/emergencycontact.component';
import { DepositeAuthenticationComponent } from './modules/deposite-authenticaton/deposite-authenticaton.component';
import { EditEmployeeComponent } from './modules/updatemodules/edit-employee/edit-employee.component';
import { EditContactComponent } from './modules/updatemodules/edit-contact/edit-contact.component';
import { EditJobDescriptionComponent } from './modules/updatemodules/edit-job-description/edit-job-description.component';
import { EditSpouseComponent } from './modules/updatemodules/edit-spouse/edit-spouse.component';
import { EditEmergencyContactComponent } from './modules/updatemodules/edit-emergencycontact/edit-emergencycontact.component';
import { EditTrainingComponent } from './modules/updatemodules/edit-training/edit-training.component';
import { EditDepositeAuthenticationComponent } from './modules/updatemodules/edit-depositeauthentication/edit-depositeauthentication.component';
import { EditQualificationComponent } from './modules/updatemodules/edit-qualification/edit-qualification.component';
import { WorkexperienceComponent } from './modules/workexperience/workexperience.component';
import { EducationComponent } from './modules/education/education.component';
import { EditWorkexperienceComponent } from './modules/updatemodules/edit-workexperience/edit-workexperience.component';
import { EditEducationComponent } from './modules/updatemodules/edit-education/edit-education.component';

const routes: Routes = [
  {path: '',
  component: DefaultComponent,
children:
   [
{path:'',
component:DashboardComponent,
},
{path:'dashboard',
component:DashboardComponent,
},
{path:'employee-registration',
component:EmployeeRegistrationComponent}
,
{path:'employee-registration/contact',
component: ContactComponent},
{path:'employee-registration/job-description',
component: JobdescriptionComponent},
{path:'employee-registration/education',
component: EducationComponent},
{path:'employee-registration/work-experience',
component: WorkexperienceComponent},
{path:'employee-registration/spouse',
component: SpouseComponent},
{path:'employee-registration/training',
component: TrainingComponent},
{path:'employee-registration/emergency-contact',
component: EmergencycontactComponent},
{path:'employee-registration/deposite-authentication',
component: DepositeAuthenticationComponent},

{path:'admin',
component: PositionComponent},
{path:'admin/position',
component: PositionComponent},

{path:'admin/step',
component: StepComponent},
{path:'admin/grade',
component: GradeComponent},
{path:'admin/education-level',
component: EducationLevelComponent},
{path:'admin/branch',
component: BranchComponent},
{path:'admin/supervisor',
component: SupervisorComponent},
{path:'employee-list',
component: EmployeeListComponent},
{path:'edit-employee/:empId',
component: EditEmployeeComponent},
{path:'edit-contact/:id',
component: EditContactComponent},
{path:'edit-education/:id',
component: EditEducationComponent},
{path:'edit-workExperience/:id',
component: EditWorkexperienceComponent},
{path:'edit-employeePosition/:id',
component: EditJobDescriptionComponent},
{path:'edit-emergencyContact/:id',
component: EditEmergencyContactComponent},
{path:'edit-spouse/:id',
component: EditSpouseComponent},
{path:'edit-training/:id',
component: EditTrainingComponent},
{path:'edit-depositeAuthentication/:id',
component: EditDepositeAuthenticationComponent}
]
}]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
