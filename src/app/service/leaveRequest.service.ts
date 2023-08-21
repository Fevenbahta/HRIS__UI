import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from 'app/models/leaverequestmodel';




@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllLeaveRequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl + 'api/LeaveRequest');
  }
  getLeaveRequest(id:string): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(this.apiUrl + 'api/LeaveRequest/'+id);
  }

  addLeaveRequest(addLeaveRequestRequest:LeaveRequest): Observable<LeaveRequest> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<LeaveRequest>(this.apiUrl + 'api/LeaveRequest', addLeaveRequestRequest,httpOptions);
  }

  updateLeaveRequest(LeaveRequestDetails:LeaveRequest, Id:string): Observable<LeaveRequest> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<LeaveRequest>(this.apiUrl + 'api/LeaveRequest/'+Id, LeaveRequestDetails,httpOptions);
  }

  deleteLeaveRequest(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/LeaveRequest/' + Id, httpOptions);
  }

  

}
