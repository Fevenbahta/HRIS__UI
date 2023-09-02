import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepositeAuthentication } from 'app/models/deposite-authentication.model';
import { ApiUrlService } from './api-url.service';




@Injectable({
  providedIn: 'root'
})
export class DepositeAuthenticationService {
 


  constructor(private http: HttpClient , private apiUrlService: ApiUrlService) { }

  getAllDepositeAuthentication(): Observable<DepositeAuthentication[]> {
    return this.http.get<DepositeAuthentication[]>(this.apiUrlService.apiUrl + 'api/DepositAutorization');
  }
  getDepositeAuthentication(id:string): Observable<DepositeAuthentication> {
    return this.http.get<DepositeAuthentication>(this.apiUrlService.apiUrl + 'api/DepositAutorization/'+id);
  }

  addDepositeAuthentication(addDepositeAuthenticationRequest:DepositeAuthentication): Observable<DepositeAuthentication> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<DepositeAuthentication>(this.apiUrlService.apiUrl + 'api/DepositAutorization', addDepositeAuthenticationRequest,httpOptions);
  }

  updateDepositeAuthentication(depositeauthenticationDetails:DepositeAuthentication, Id:string): Observable<DepositeAuthentication> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<DepositeAuthentication>(this.apiUrlService.apiUrl + 'api/DepositAutorization/'+Id, depositeauthenticationDetails,httpOptions);
  }

  deleteDepositeAuthentication(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'api/DepositAutorization/' + Id, httpOptions);
  }

  

}
