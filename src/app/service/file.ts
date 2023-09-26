import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Files } from 'app/models/File';


@Injectable({
  providedIn: 'root'
})
export class FileService {
 
  readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<Files[]> {
    return this.http.get<Files[]>(this.apiUrl + 'api/File');
  }
 
  getFiles(id:string): Observable<Blob> {
  
    return this.http.get(this.apiUrl + 'api/File/'+id ,{ responseType: 'blob' });
  }

  addFiles(addFilesRequest: Files): Observable<Files> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Files>(this.apiUrl + 'api/File', addFilesRequest, httpOptions)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during addFiles:', error);
          // Handle the error here, you can throw a custom error or do any other error handling
          return throwError('An error occurred during addFiles. Please try again later.');
        })
      );
  }
  updateFiles(FilesDetails: Files, Id:string): Observable<Files> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Files>(this.apiUrl + 'api/File/'+Id, FilesDetails,httpOptions);
  }

  deleteFiles(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrl + 'api/File/' + Id, httpOptions);
  }

  

}
