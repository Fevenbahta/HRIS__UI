import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from 'app/models/job-description.model';
import { Department } from 'app/models/education.model';




@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl + 'api/Department');
  }
  getDepartment(id:number): Observable<Department> {
    return this.http.get<Department>(this.apiUrl + 'api/Department/'+id);
  }

//   addDepartment(addDivisionRequest: Department): Observable<Department> {
//     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     // addDivisionRequest.id="0000000-0000-0000-0000-000000000000"
//     return this.http.post<Department>(this.apiUrl + 'api/Department', addDepartmentRequest, httpOptions);
//   }

//   updateDivision(divisionDetails: Division,Id:number): Observable<Division> {
//     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     return this.http.put<Division>(this.apiUrl + 'api/Division/'+Id, divisionDetails, httpOptions);
//   }

//   deleteDivision(Id: number): Observable<string> {
//     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     return this.http.delete<string>(this.apiUrl + 'api/Division/' + Id, httpOptions);
//   }

  

}
