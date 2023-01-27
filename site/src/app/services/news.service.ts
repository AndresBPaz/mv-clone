import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url = environment.apiUrl + '/blogs';
  token = '';
  headers:any;

  constructor(
    private http: HttpClient) {
  }

  getNews(){
    return this.http.get<any>(`${this.url}/public/`);
  }

  getNewsD(slug: string){
    return this.http.get<any>(`${this.url}/public/${slug}`);
  }

  getNews4(){
    return this.http.get<any>(`${this.url}/public/`);
  }

  /**
   * Lista los blogs por páginacion.
   * @param pageSize
   * @param page 
   * @returns 
   */
  getComunicados(pageSize: number, page: number) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    return this.http.get <any>(`${this.url}/comunicados`, {params: params});
  }

}
