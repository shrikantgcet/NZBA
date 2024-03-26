import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }

  public getCustomers()
  {
    return this._http.get(`${baseUrl}/Customers`);
  }

  public getCustomerById(customerId:any)
  {
    return this._http.get(`${baseUrl}/Customers/${customerId}`);

  }

  public addCustomer(customer:any)
  {
    return this._http.post(`${baseUrl}/Customers`, customer);
  }

  

  public deleteCustomer(customerId:any)
  {
    return this._http.delete(`${baseUrl}/Customers/${customerId}`);
  }

  public updateCustomer(customerId:any, customer:any)
  {
    return this._http.put(`${baseUrl}/Customers/${customerId}`, customer);
  }

  public getCustomerByOrgId(orgId:any)
  {
    return this._http.get(`${baseUrl}/Customers/organisation/${orgId}`);

  }
}
