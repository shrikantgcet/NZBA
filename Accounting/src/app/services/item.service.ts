import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http:HttpClient) { }


  public getItems()
  {
    return this._http.get(`${baseUrl}/Items`);
  }

  public getItemById(itemId:any)
  {
    return this._http.get(`${baseUrl}/Items/${itemId}`);

  }

  public addItem(item:any)
  {
    return this._http.post(`${baseUrl}/Items`, item);
  }



  public deleteItem(itemId:any)
  {
    return this._http.delete(`${baseUrl}/Items/${itemId}`);
  }

  public updateItem(itemId:any, item:any)
  {
    return this._http.put(`${baseUrl}/Items/${itemId}`, item);
  }

  public getItemByOrgId(orgId:any)
  {
    return this._http.get(`${baseUrl}/Items/organisation/${orgId}`);

  }

}
