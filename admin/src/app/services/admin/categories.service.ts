import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = environment.apiUrl + '/categories';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }

  getCategories(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  getCategory(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }

  getCategoryChildren(id: string){
    return this.http.get<any>(`${this.url}/children/${id}`, {headers: this.headers});
  }

  activeCategory(params:any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postCategory(params: any){
    return this.http.post<any>(`${this.url}`, params, {headers: this.headers});
  }

  putCategory(id: any, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deleteCategory(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }

}
