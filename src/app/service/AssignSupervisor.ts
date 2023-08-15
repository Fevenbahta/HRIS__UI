import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignSupervisor, Step } from 'app/models/job-description.model';



@Injectable({
  providedIn: 'root'
})
export class AssignSupervisorService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllAssignSupervisor(): Observable<AssignSupervisor[]> {
    return this.http.get<AssignSupervisor[]>(this.apiUrl + 'api/AssignSupervisor');
  }
  getAssignSupervisor(id:number): Observable<AssignSupervisor> {
    return this.http.get<AssignSupervisor>(this.apiUrl + 'api/AssignSupervisor/'+id);
  }

  addAssignSupervisor(addAssignSupervisorRequest:AssignSupervisor): Observable<AssignSupervisor> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<AssignSupervisor>(this.apiUrl + 'api/AssignSupervisor', addAssignSupervisorRequest,httpOptions);
  }

  updateAssignSupervisor(AssignSupervisorDetails:AssignSupervisor, Id:number): Observable<AssignSupervisor> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<AssignSupervisor>(this.apiUrl + 'api/AssignSupervisor/'+Id, AssignSupervisorDetails,httpOptions);
  }

  deleteAssignSupervisor(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/AssignSupervisor/' + Id, httpOptions);
  }

  

}
