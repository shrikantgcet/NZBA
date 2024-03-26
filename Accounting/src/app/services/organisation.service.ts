import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private _http:HttpClient) { }


  public getOrganisations()
  {
    return this._http.get(`${baseUrl}/Organisations`);
  }

  public getOrganisationById(orgId:any)
  {
    return this._http.get(`${baseUrl}/Organisations/${orgId}`);

  }

  public addOrganisation(organisation:any)
  {
    return this._http.post(`${baseUrl}/Organisations`, organisation);
  }
  public deleteOrganisation(orgId:any)
  {
    return this._http.delete(`${baseUrl}/Organisations/${orgId}`);
  }

  public updateOrganisation(orgId:any, organisation:any)
  {
    return this._http.put(`${baseUrl}/Organisations/${orgId}`, organisation);
  }
}

