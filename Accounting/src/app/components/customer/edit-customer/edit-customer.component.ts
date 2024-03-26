import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm!: FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private _router:Router, private _customer: CustomerService, private _snack:MatSnackBar) { }
  orgId: any;
  customerId=0;
  CustomerDTO:any;

  ngOnInit(): void {
    this.orgId=this.activatedRoute.parent?.snapshot.paramMap.get('id');
    this.customerId=this.activatedRoute.snapshot.params.id;

    this.editCustomerForm = new FormGroup(
      {
        name: new FormControl('',Validators.required),
        email: new FormControl('',Validators.required),
        phoneNumber: new FormControl('',Validators.required),
        line1: new FormControl(''),
        town: new FormControl(''),
        city: new FormControl(''),
        postCode: new FormControl('')
      }
    )
    this._customer.getCustomerById(this.customerId).subscribe(
      (data)=>{
        this.CustomerDTO=data;
        console.log(this.CustomerDTO);
        this.editCustomerForm = new FormGroup(
          {
            name: new FormControl(this.CustomerDTO.name,Validators.required),
            email: new FormControl(this.CustomerDTO.email,Validators.required),
            phoneNumber: new FormControl(this.CustomerDTO.phoneNumber,Validators.required),
            line1: new FormControl(this.CustomerDTO.line1),
            town: new FormControl(this.CustomerDTO.town),
            city: new FormControl(this.CustomerDTO.city),
            postCode: new FormControl(this.CustomerDTO.postCode)
          }
        )
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  editCustomer(){
    this.CustomerDTO.name = this.editCustomerForm.get('name')?.value;
    this.CustomerDTO.email=this.editCustomerForm.get('email')?.value;
    this.CustomerDTO.phoneNumber=this.editCustomerForm.get('phoneNumber')?.value;
    this.CustomerDTO.line1=this.editCustomerForm.get('line1')?.value;
    this.CustomerDTO.town=this.editCustomerForm.get('town')?.value;
    this.CustomerDTO.city=this.editCustomerForm.get('city')?.value;
    this.CustomerDTO.postCode=this.editCustomerForm.get('postCode')?.value;
    this.CustomerDTO.organisationId = this.orgId;
    console.log(this.CustomerDTO);

    this._customer.updateCustomer(this.customerId, this.CustomerDTO).subscribe(
      (data)=>{
        Swal.fire('Success!', 'Customer Updated', 'success');
      },
      (error)=>{
        Swal.fire('Error', 'error in updating', 'error');
      }

    );
    
    this._router.navigate(['/organisation/'+this.orgId+'/customer']);
  }

}
