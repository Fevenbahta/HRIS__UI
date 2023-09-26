import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Holiday } from 'app/models/holiday';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllHoliday(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl + 'api/Holiday');
  }
  getHoliday(id:string): Observable<Holiday> {
    return this.http.get<Holiday>(this.apiUrl + 'api/Holiday/'+id);
  }

  addHoliday(addHolidayRequest: Holiday): Observable<Holiday> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Holiday>(this.apiUrl + 'api/Holiday', addHolidayRequest, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during addHoliday:', error);
          // Handle the error here, you can throw a custom error or do any other error handling
          return throwError('An error occurred during addHoliday. Please try again later.');
        })
      );
  }
  updateHoliday(HolidayDetails: Holiday, Id:string): Observable<Holiday> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Holiday>(this.apiUrl + 'api/Holiday/'+Id, HolidayDetails,httpOptions);
  }

  deleteHoliday(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/Holiday/' + Id, httpOptions);
  }

  

}
