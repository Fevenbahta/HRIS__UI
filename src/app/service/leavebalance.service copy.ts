import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OtherLeaveBalance } from 'app/models/leaverequestmodel';




@Injectable({
  providedIn: 'root'
})
export class OtherLeaveBalanceService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllOtherLeaveBalance(): Observable<OtherLeaveBalance[]> {
    return this.http.get<OtherLeaveBalance[]>(this.apiUrl + 'api/OtherLeaveBalance');
  }
  getOtherLeaveBalance(id:string): Observable<OtherLeaveBalance[]> {
    return this.http.get<OtherLeaveBalance[]>(this.apiUrl + 'api/OtherLeaveBalance/'+id);
  }

  addOtherLeaveBalance(addOtherLeaveBalanceRequest:OtherLeaveBalance): Observable<OtherLeaveBalance> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<OtherLeaveBalance>(this.apiUrl + 'api/OtherLeaveBalance', addOtherLeaveBalanceRequest,httpOptions);
  }

  updateOtherLeaveBalance(OtherLeaveBalanceDetails:OtherLeaveBalance, Id:string): Observable<OtherLeaveBalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<OtherLeaveBalance>(this.apiUrl + 'api/OtherLeaveBalance/'+Id, OtherLeaveBalanceDetails,httpOptions);
  }

  deleteOtherLeaveBalance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/OtherLeaveBalance/' + Id, httpOptions);
  }

  

}
