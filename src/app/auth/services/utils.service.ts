import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private countries = 'https://restcountries.com/v3.1/all';


  constructor(private http:HttpClient) { }

  listaPaises():Observable<any>{
    return this.http.get<any>(`${ this.countries }`)
  }
}
