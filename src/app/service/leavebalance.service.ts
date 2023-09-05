import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnualLeaveBalance } from 'app/models/leaverequestmodel';




@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllLeaveBalance(): Observable<AnnualLeaveBalance[]> {
    return this.http.get<AnnualLeaveBalance[]>(this.apiUrl + 'api/LeaveBalance');
  }
  getLeaveBalance(id:string): Observable<AnnualLeaveBalance[]> {
    return this.http.get<AnnualLeaveBalance[]>(this.apiUrl + 'api/LeaveBalance/'+id);
  }
  getLeaveBalanceByEmp(employeeId: string): Observable<any> {
    const url = `${this.apiUrl}/api/LeaveBalance/${employeeId}`;
 return this.http.get(url);;
  }
  addLeaveBalance(addLeaveBalanceRequest:AnnualLeaveBalance): Observable<AnnualLeaveBalance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<AnnualLeaveBalance>(this.apiUrl + 'api/LeaveBalance', addLeaveBalanceRequest,httpOptions);
  }

  updateLeaveBalance(LeaveBalanceDetails:AnnualLeaveBalance, Id:string): Observable<AnnualLeaveBalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<AnnualLeaveBalance>(this.apiUrl + 'api/LeaveBalance/'+Id, LeaveBalanceDetails,httpOptions);
  }

  deleteLeaveBalance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/LeaveBalance/' + Id, httpOptions);
  }

  

}
