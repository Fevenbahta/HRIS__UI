
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router'; 
 
 
import { Employee, Supervisor } from 'app/models/employee.model'; 
import { EmployeeService } from 'app/service/employee.service'; 
import { PidService } from 'app/service/pid.service'; 
import { SupervisorService } from 'app/service/supervisor.service'; 
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeIdService } from 'app/service/employee-id.service';
 
@Component({ 
  selector: 'app-employee-registration', 
  templateUrl: './employee-registration.component.html', 
  styleUrls: ['./employee-registration.component.scss'] 
}) 
export class EmployeeRegistrationComponent implements OnInit { 
  employeeForm: FormGroup; 
   selectedImage: File;
   supervisors:Supervisor[]=[];
   filteredEmployees: any[] = []; 

 employeeSaved: boolean = false; 
 employees: Employee[] = []; 
 employee:Employee;

 firstSupervisors: Supervisor[] = []; // Array to store first supervisors only 
 selectedFirstSupervisor: string = ''; 
 
 secondSupervisors: Supervisor[] = []; // Array to store first supervisors only 
 selectedSecondSupervisor: string = ''; 
  buttons = [ 
    { label: ' Add Employee ', route: '/employee-registration' }, 
    { label: '  List Employee ', route: '/employee-list' } ,
    {label:'Employee History', route:'/history'}
  ]; 
 
  constructor( 
    private formBuilder: FormBuilder, 
    private pIdservice: PidService, 
    private employeeservice: EmployeeService, 
    private router: Router, 
    private supervisorService:SupervisorService ,
    private dialog: MatDialog, 
    private employeeIdService:EmployeeIdService
  ) {} 
 
  ngOnInit(): void { 
 
     
   
 
    this.employeeForm = this.formBuilder.group({ 
      pId: [0], // You can add any specific validation rule here, like Validators.required 
      createdBy: ['string', Validators.required], 
      createdDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedDate: [ "2023-07-25T09:28:33.440Z", Validators.required], 
      updatedBy: ['string', Validators.required], 
      empId: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // You can add any specific validation rule here, like Validators.required 
      ecxId: ['ecx/pi',Validators.required], 
      adId: ['ad/pi', Validators.required], 
      firstName: ['', Validators.required], 
      middleName: [''], 
      lastName: ['', Validators.required], 
      joinDate: ['', Validators.required], 
      sex: ['', Validators.required], 
      dateOfBityh: ['', Validators.required], 
      placeOfBith: ['', Validators.required], 
      martialStatus: ['', Validators.required], 
      salutation: ['', Validators.required], 
      nationality: ['', Validators.required], 
      pensionNo: ['', Validators.required], 
      imageData: [''], 
      crime: [false], 
      crimeDescription: [''], 
      firstSupervisor: ['', Validators.required], 
      secondSupervisor: ['', Validators.required], 
      status: [0,] 
    }); 
 
    this.supervisorService.getAllSupervisors() 
    .subscribe({ 
      next: (supervisors) => { 
        this.supervisors = supervisors; 
        this.firstSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'First Supervisor'); 
        this.secondSupervisors = supervisors.filter((supervisor) => supervisor.supervisorLevel == 'Second Supervisor'); 
      }, 
      error(response) { 
        console.log(response); 
      }, 
    }); 
    this.employeeservice.getAllEmployees() 
    .subscribe({ 
      next: (employees) => { 
        this.employees=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 

    
    this.employeeservice.getEmployee(this.employeeIdService.employeeId) 
    .subscribe({ 
      next: (employees) => { 
        this.employee=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 
} 
  
 
getEmployees() {  
  this.employeeservice.getEmployee(this.employeeIdService.employeeId)
  .subscribe(  
    (employees) => {  
      this.employee = employees;  
    },  
    (error) => {  
      console.log(error);  
    }  
  );  ;
}     
   
 
  addEmployee(): void { 
    if (this.employeeForm.valid) { 
      const formData = this.employeeForm.value; 
       formData.imageData = this.employeeForm.get('imageData').value;
      // formData.empId = uuidv4(); 
      this.employeeForm.value.firstSupervisor = this.selectedFirstSupervisor; 
      this.employeeForm.value.secondSupervisor = this.selectedSecondSupervisor; 
      this.employeeservice.addEmployee(formData)
      .subscribe({ 
        next: (contact) => { 
      console.log(formData)
          this.employeeSaved = true; 
          setTimeout(() => { 
            this.employeeSaved = false; 
          }, 2000); 
          // Add the current work experience to the array 
          this.employees.push({ ...this.employeeForm.value }); 
          // Reset the form fields 
          
    this.employeeservice.getEmployee(this.employeeIdService.employeeId) 
    .subscribe({ 
      next: (employees) => { 
        this.employee=employees; 
      }, 
      error(response){ 
        console.log(response) 
      }, 
       
    }); 
           
        }, 
        error: (response) => { 
          console.log(response); 
        } 
      }); 
console.log(this.employeeForm.value) 
    } 
     else { 
      this.validateAllFormFields(this.employeeForm); 
      console.log("error") 
    } 
  } 
validateAllFormFields(formGroup: FormGroup) { 
  Object.keys(formGroup.controls).forEach((field) => { 
    const control = formGroup.get(field); 
    if (control instanceof FormGroup) { 
      this.validateAllFormFields(control); 
    } else { 
      control.markAsTouched({ onlySelf: true }); 
    } 
  });} 
 
  getEmployeeName(empId: string): string { 
    const employee = this.employees.find((g) => g.empId === empId); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:'Unknown EMPLOYEE'; 
  } 


 
  openImageDialog(): void {
    // Trigger click on the file input element to open the image dialog
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.click();
  }
  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.getBase64(file).then((data) => {
        this.employeeForm.patchValue({
          imageData: data
        });
      });
    }
  }
    private getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // // Helper method to convert selected image to base64
  // private getBase64(file: File): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }
  getFirstSupervisorName(firstSupervisor: string): string { 
    const employee = this.employees.find((g) => g.empId === firstSupervisor); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:''; 
  } 
  getSecondSupervisorName(secondSupervisor: string): string { 
    const employee = this.employees.find((g) => g.empId === secondSupervisor); 
    return employee ? `${employee.firstName}  ${employee.middleName} ${employee.lastName}`:''; 
  } 
  getConcatenatedData() {
    let employee ='';
     employee =this.employee.firstName +''+ this.employee.lastName
    return employee ? employee : '';
    
  }
  deleteEmployee(id: string) { 
    // Open the confirmation dialog 
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { 
      width: '400px', 
    }); 
   
    // After the dialog is closed (by clicking Confirm or Cancel button) 
    dialogRef.afterClosed().subscribe((result) => { 
      // If the user confirms the deletion, proceed with the deletion 
      if (result === true) { 
        this.employeeservice.deleteEmployee(id).subscribe( 
          () => { 
            // Update the employee list by filtering out the deleted employee 
            this.employees = this.employees.filter((employee) => employee.empId !== id); 
            // Show a success message 
            // this.showSnackBar('Employee deleted successfully!'); 
            this.router.navigate(["/edit-employee"]); 
            alert('Contact deleted successfully!');
          }, 
          (error) => { 
            console.log(error); 
            // Show an error message 
            // this.showSnackBar('Failed to delete the employee. Please try again later.', 'mat-warn'); 
          } 
        ); 
      } 
    }); 
  } 
   
  // private showSnackBar(message: string, panelClass: string = 'mat-toolbar') { 
  //   this.snackBar.open(message, 'Close', { 
  //     duration: 3000, 
  //     panelClass: ['mat-toolbar', panelClass], 
  //   }); 
  // } 
  editEmployee(employee: Employee): void { 
    // Here, we will navigate to the edit page for the selected EmergencyContact. 
    this.router.navigate(["/edit-employee", employee.empId]); 
  } 
    

  } 
 
 
   
