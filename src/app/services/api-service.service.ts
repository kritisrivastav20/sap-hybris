import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  DEFAULT_URL : string = 'https://localhost:9002/';

  constructor(private http: HttpClient ) { }

  registerUser(payload: any) {
  let url = this.DEFAULT_URL + "occ/v2/electronics-spa/users?lang=en&curr=USD";
  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
  'Authorization': 'bearer dA5bXDu1P5YfMALaoSp39g8OkvY'});
    return this.http.post(url, payload, {headers: headers});
  }
}
