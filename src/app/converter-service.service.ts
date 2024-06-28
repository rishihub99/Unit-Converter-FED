import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface ConversionRequest {
  sourceValue: number;
  fromUnit: string;
  toUnit: string;
}



@Injectable({
  providedIn: 'root'
})
export class ConverterServiceService {
  private apiUrl = 'https://localhost:7206';

  constructor(private http: HttpClient) { }

  convertLength(request: ConversionRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/Convert/length`, request,);
  }
  

  convertMass(request: ConversionRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/Convert/mass`, request);
  }

  convertTime(request: ConversionRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/Convert/time`, request);
    }
  
}
