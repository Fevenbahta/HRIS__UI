import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  getDepartment(id:string): Observable<Department> {
    return this.http.get<Department>(this.apiUrl + 'api/Department/'+id);
  }

  addDepartment(addDepartmentRequest: Department): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // addDepartmentRequest.id="0000000-0000-0000-0000-000000000000"
    return this.http.post<Department>(this.apiUrl + 'api/Department', addDepartmentRequest, httpOptions);
  }

  updateDepartment(DepartmentDetails: Department,Id:string): Observable<Department> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Department>(this.apiUrl + 'api/Department/'+Id, DepartmentDetails, httpOptions);
  }

  deleteDepartment(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/Department/' + Id, httpOptions);
  }

  

}
