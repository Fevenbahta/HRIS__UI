import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrlService } from './api-url.service';
import { PromotionRelation } from 'app/models/vacancy/promotion.model';





@Injectable({
  providedIn: 'root'
})
export class PromotionRelationService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllPromotionRelation(): Observable<PromotionRelation[]> {
    return this.http.get<PromotionRelation[]>(this.apiUrlService.apiUrl + 'api/PromotionRelation');
  }
  getpromotionRelationByStatus(promotionStatus: string): Observable<PromotionRelation[]> {
    
    return this.http.get<PromotionRelation[]>(this.apiUrlService.apiUrl + 'api/promotionRelation/status/'+promotionStatus)
  }

  getPromotionRelation(id:string): Observable<PromotionRelation> {
    return this.http.get<PromotionRelation>(this.apiUrlService.apiUrl + 'api/PromotionRelation/'+id);
  }

  addPromotionRelation(addPromotionRelationRequest:PromotionRelation): Observable<PromotionRelation> {
    // addEmployeeRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<PromotionRelation>(this.apiUrlService.apiUrl + 'api/PromotionRelation', addPromotionRelationRequest,httpOptions);
  }

  updatePromotionRelation(PromotionRelationDetails:PromotionRelation, Id:string): Observable<PromotionRelation> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<PromotionRelation>(this.apiUrlService.apiUrl + 'api/PromotionRelation/'+Id, PromotionRelationDetails,httpOptions);
  }

  deletePromotionRelation(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'api/PromotionRelation/' + Id, httpOptions);
  }

  

}
