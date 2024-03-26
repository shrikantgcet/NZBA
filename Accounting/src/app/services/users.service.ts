import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:HttpClient) { }
  public getUsers()
  {
    return this._http.get(`${baseUrl}/Users`);
  }

  public getUserById(userId:any)
  {
    return this._http.get(`${baseUrl}/Users/${userId}`);

  }

  public addUser(user:any)
  {
    return this._http.post(`${baseUrl}/Users`, user);
  }



  public deleteUser(userId:any)
  {
    return this._http.delete(`${baseUrl}/Users/${userId}`);
  }

  public updateUser(userId:any, user:any)
  {
    return this._http.put(`${baseUrl}/Users/${userId}`, user);
  }
}
