import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  url = environment.apiUrl + '/blogs';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }


  getBlogs(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  showBlog(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }

  activeBlog(params: any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postBlog(params: any){
    return this.http.post<any>(this.url, params, {headers: this.headers});
  }

  putBlog(id: string, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deleteBlog(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }
}
