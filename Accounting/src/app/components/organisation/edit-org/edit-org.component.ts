import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganisationService } from 'src/app/services/organisation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css']
})
export class EditOrgComponent implements OnInit {

  public orgForm!: FormGroup;


  constructor(private activatedRoute:ActivatedRoute, private _router:Router, private _organisation: OrganisationService, private _snack:MatSnackBar) { }

  orgId=0;
  OrganisationDTO:any;
 // OrganisationDTO =   {name: 'Test ORG', shortCode: 'TEST', gstNumber: '123456', addressStreet1: 'Upper HUtt', addressStreet2: 'Welington', addressCityTown: 'Welington',
   //  country: 'New Zealand', postCode: '5018', phonePrefix: '022',  phone: '5088053'};

  ngOnInit(): void {
    this.orgForm=new FormGroup(
      {
        id: new FormControl(''),
orgName: new FormControl('',[Validators.required]),
 shortCode: new FormControl('',[Validators.required]),
 gstNumber: new FormControl('',[Validators.required]),
 addressStreet1: new FormControl('',[Validators.required]),
 addressStreet2: new FormControl('',[Validators.required]),
 addressCityTown: new FormControl('',[Validators.required]),
 postCode: new FormControl('',[Validators.required]),
 phonePrefix: new FormControl('',[Validators.required]),
 phone: new FormControl('',[Validators.required]),
 country: new FormControl('',Validators.required)
      }
    )
    this.orgId=this.activatedRoute.snapshot.params.id;
//this.orgForm.id = this.orgId;
    this._organisation.getOrganisationById(this.orgId).subscribe(
      (data)=>{
        this.OrganisationDTO=data;
        console.log(this.OrganisationDTO);
        this.orgForm=new FormGroup(
          {
            id: new FormControl(this.OrganisationDTO.orgId),
    orgName: new FormControl(this.OrganisationDTO.orgName,[Validators.required]),
     shortCode: new FormControl(this.OrganisationDTO.shortCode,[Validators.required]),
     gstNumber: new FormControl(this.OrganisationDTO.gstNumber,[Validators.required]),
     addressStreet1: new FormControl(this.OrganisationDTO.addressStreet1,[Validators.required]),
     addressStreet2: new FormControl(this.OrganisationDTO.addressStreet2,[Validators.required]),
     addressCityTown: new FormControl(this.OrganisationDTO.addressCityTown,[Validators.required]),
     postCode: new FormControl(this.OrganisationDTO.postCode,[Validators.required]),
     phonePrefix: new FormControl(this.OrganisationDTO.phonePrefix,[Validators.required]),
     phone: new FormControl(this.OrganisationDTO.phone,[Validators.required]),
     country: new FormControl(this.OrganisationDTO.country,[Validators.required])
    }
        )
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  editOrganisation(){
    console.log(this.OrganisationDTO);
if(this.orgForm.invalid){
Swal.fire('Error','Please add required field values');
} else{
  this.OrganisationDTO.orgName = this.orgForm.get('orgName')?.value;
  this.OrganisationDTO.shortCode = this.orgForm.get('shortCode')?.value;
this.OrganisationDTO.gstNumber = this.orgForm.get('gstNumber')?.value;
this.OrganisationDTO.addressStreet1 = this.orgForm.get('addressStreet1')?.value;
this.OrganisationDTO.addressStreet2 = this.orgForm.get('addressStreet2')?.value;
this.OrganisationDTO.addressCityTown= this.orgForm.get('addressCityTown')?.value;
this.OrganisationDTO.postCode = this.orgForm.get('postCode')?.value;
this.OrganisationDTO.phonePrefix = this.orgForm.get('phonePrefix')?.value;
this.OrganisationDTO.phone = this.orgForm.get('phone')?.value;
this.OrganisationDTO.country = this.orgForm.get('country')?.value;
  console.log(this.OrganisationDTO);
  this._organisation.updateOrganisation(this.orgId, this.OrganisationDTO).subscribe(
    (data)=>{

      Swal.fire('Success!', 'Organisation Updated', 'success');
    },
    (error)=>{
      Swal.fire('Error', 'error in updating', 'error');
    }

  );

  this._router.navigate(['/organisation']);

}
  }


}
