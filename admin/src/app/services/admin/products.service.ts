import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../modules/auth";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.apiUrl + '/products';
  auth:any;
  headers:any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.auth = this.authService.getAuthFromLocalStorage();
    this.headers = new HttpHeaders({
      'x-token': this.auth.authToken,
    });
  }


  getProducts(){
    return this.http.get<any>(this.url, {headers: this.headers});
  }

  showProduct(id: string){
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.headers});
  }


  activeProduct(params: any){
    return this.http.post<any>(`${this.url}/active`, params, {headers: this.headers});
  }

  postProduct(params: any){
    return this.http.post<any>(this.url, params, {headers: this.headers});
  }

  putProduct(id: string, params: any){
    return this.http.put<any>(`${this.url}/${id}`, params, {headers: this.headers});
  }

  deleteProduct(id: string){
    return this.http.delete<any>(`${this.url}/${id}`, {headers: this.headers});
  }
}
