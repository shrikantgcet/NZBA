import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent implements OnInit {

  constructor() { }

  InvoiceDTO = [
    {name: 'Test ORG', shortCode: 'TEST', gstNumber: '123456', addressStreet1: 'Upper HUtt', addressStreet2: 'Welington', addressCityTown: 'Welington',
     country: 'New Zealand', postCode: '5018', phonePrefix: '022',  phone: '5088053'},
    {name: 'Test ORG2', shortCode: 'TEST2', gstNumber: '1234562', addressStreet1: 'Upper HUtt2', addressStreet2: 'Welington2', addressCityTown: 'Welington',
    country: 'New Zealand2', postCode: '5018', phonePrefix: '022',  phone: '50880532'}];

  ngOnInit(): void {
  }

}
