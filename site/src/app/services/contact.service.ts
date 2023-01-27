import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = environment.apiUrl + '/emails';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {
  }

  sendContact(params: any){
    return this.http.post<any>(`${this.url}/send/contact/`, params);
  }
}
