import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  orgId: any;
  constructor(private _activateRoute: ActivatedRoute, private _customer: CustomerService, private _router: Router) { }

  CustomerDTO =   {name: '', email: '', line1: '', town:'', city:'', postcode:'', phoneNumber:'',organisationId: ''};

  ngOnInit(): void {
    this.orgId=this._activateRoute.parent?.snapshot.paramMap.get('id');
  }


  addCustomer(){
    console.log(this.CustomerDTO);
    this.CustomerDTO.organisationId = this.orgId;
    this._customer.addCustomer(this.CustomerDTO).subscribe(

      (data:any)=>{
        Swal.fire('Success!', 'Customer Added', 'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !', 'Server Error !', 'error');
      }

    );
   
    this._router.navigate(['/organisation/'+this.orgId+'/customer']);
  }

}
