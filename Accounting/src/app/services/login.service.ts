import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private _http:HttpClient) { }

  public addOrganisation(organisation:any)
  {
    return this._http.post(`${baseUrl}/Authentication/login`, organisation);
  }
}
