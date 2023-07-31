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
