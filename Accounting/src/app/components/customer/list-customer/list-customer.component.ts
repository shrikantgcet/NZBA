import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email','phoneNumber', 'line1', 'town','city','postCode','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  orgId: any;


  constructor(private _snack:MatSnackBar, private _customer: CustomerService, private _route: ActivatedRoute) { }

  CustomerDTO:any = [];

  ngOnInit(): void {

    this.orgId=this._route.parent?.snapshot.paramMap.get('id');
   
 

    this._customer.getCustomerByOrgId(this.orgId).subscribe((data:any)=>{
    this.CustomerDTO=data;
    console.log(data);
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort

    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !", "Error in loading data", 'error');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCustomer(orgId:any){
    console.log(orgId);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this Customer'

    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._customer.deleteCustomer(orgId).subscribe(
          (data)=>{
            this._snack.open('Customer Deleted', 'OK', {
              duration:3000
            });
            //if dont want to make call to backend but lastdata doesn't go away after deletion
            /*this.dataSource= new MatTableDataSource(this.OrganisationDTO.filter((org:any)=>org.id!= orgId));  
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort
            */

            //call get data again
            this._customer.getCustomers().subscribe((data:any)=>{
            this.dataSource=new MatTableDataSource(data);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort
            },
            (error)=>{
              console.log(error);
              Swal.fire("Error !", "Error in loading data", 'error')
            });
            //call get data again ends
            
          },
          (error)=>{
            this._snack.open('Error occured', 'OK', {
              duration:3000
            });
          }
        );
        
        
      }
        
      }
    )
  }

}
