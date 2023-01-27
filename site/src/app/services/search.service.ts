import { HttpParams, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = environment.apiUrl + '/search';
  token = '';
  headers:any;

  constructor(private http: HttpClient) { }

  getSearch(pageSize: number, page: number, termino: string) {
    let params = new HttpParams();
    // params = params.append('page', page);
    // params = params.append('pageSize', pageSize);
    params = params.append('q', termino);
    // return this.http.get <any>(`${this.url}/blogs`, {params: params})
    return this.http.get <any>(`${this.url}/blogs/${termino}`)
  }
  
}
