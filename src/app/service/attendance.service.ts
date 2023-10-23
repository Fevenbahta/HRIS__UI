import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { Attendance } from 'app/models/Attendance.model';
import { Employee } from 'app/models/employee.model';



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 
 
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrlService.apiUrl + 'api/Attendance');
  }
  getAttendance(id:number): Observable<Attendance> {
    return this.http.get<Attendance>(this.apiUrlService.apiUrl + 'api/Attendance/'+id);
  }

  importAttendance(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrlService.apiUrl + 'api/Attendance/import', formData);
  } 

  updateAttendance(AttendanceDetails:Employee, Id:string): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Employee>(this.apiUrlService.apiUrl + 'api/Attendance/'+Id, AttendanceDetails,httpOptions);
  }

  deleteAttendance(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'api/Attendance/' + Id, httpOptions);
  }

  

}
