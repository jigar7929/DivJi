import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

export interface PlasticGrade {
  code: string;
  name: string;
  description: string;
  uses: string[];
  products: string[];
  mfi: string;
  density: string;
  processingMethods: string[];
  machineryUsed: string[];
  industries: string[];
}

export interface PlasticGranule {
  type: string;
  fullForm: string;
  recyclingCode: number;
  grades: PlasticGrade[];
}

export interface PlasticGranulesData {
  plasticGranules: PlasticGranule[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching the data.';
    
    if (error.status === 404) {
      errorMessage = 'Could not find the product data file.';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getPlasticGranules(): Observable<PlasticGranulesData> {
    return this.http.get<PlasticGranulesData>('assets/data/plastic-granules.json').pipe(
      retry(2), // Retry failed requests up to 2 times
      catchError(this.handleError)
    );
  }

  getPlasticGranuleByType(type: string): Observable<PlasticGranule | undefined> {
    return this.getPlasticGranules().pipe(
      map(data => data.plasticGranules.find(g => g.type === type)),
      catchError(this.handleError)
    );
  }
}
