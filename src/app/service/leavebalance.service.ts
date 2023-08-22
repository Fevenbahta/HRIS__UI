import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveBalance } from 'app/models/leaverequestmodel';




@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllLeaveBalance(): Observable<LeaveBalance[]> {
    return this.http.get<LeaveBalance[]>(this.apiUrl + 'api/LeaveBalance');
  }
  getLeaveBalance(id:string): Observable<LeaveBalance[]> {
    return this.http.get<LeaveBalance[]>(this.apiUrl + 'api/LeaveBalance/'+id);
  }

  addLeaveBalance(addLeaveBalanceRequest:LeaveBalance): Observable<LeaveBalance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<LeaveBalance>(this.apiUrl + 'api/LeaveBalance', addLeaveBalanceRequest,httpOptions);
  }

  updateLeaveBalance(LeaveBalanceDetails:LeaveBalance, Id:string): Observable<LeaveBalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<LeaveBalance>(this.apiUrl + 'api/LeaveBalance/'+Id, LeaveBalanceDetails,httpOptions);
  }

  deleteLeaveBalance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/LeaveBalance/' + Id, httpOptions);
  }

  

}
