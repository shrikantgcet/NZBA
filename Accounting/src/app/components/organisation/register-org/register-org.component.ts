import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganisationService } from 'src/app/services/organisation.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient,HttpErrorResponse, HttpEventType } from '@angular/common/http';
import baseUrl from 'src/app/services/helper';

@Component({
  selector: 'app-register-org',
  templateUrl: './register-org.component.html',
  styleUrls: ['./register-org.component.css']
})
export class RegisterOrgComponent implements OnInit {

   public orgForm!: FormGroup;
   public personalForm!: FormGroup;
   public step3!: FormGroup;
   progress!: number;
   message!: string;
   @Output() public onUploadFinished = new EventEmitter();


  constructor(private activatedRoute:ActivatedRoute, private _router:Router, private _organisation: OrganisationService, private builder:FormBuilder, private _user:UsersService,private _http:HttpClient) {

   }

  OrganisationDTO =   {orgName: '', shortCode: '', gstNumber: '', addressStreet1: '',addressStreet2: '', addressCityTown: '',
  postCode: '',country: '',  phonePrefix: '',  phone: ''};
PersonalDTO= {Firstname: '',Lastname: '',Email: '',Password: ' ',Phone: ''}
  ngOnInit(): void {
    this.orgForm=new FormGroup(
            {
      orgName: new FormControl('',[Validators.required]),
       shortCode: new FormControl('',[Validators.required]),
       gstNumber: new FormControl('',[Validators.required]),
       addressStreet1: new FormControl('',[Validators.required]),
       addressStreet2: new FormControl('',[Validators.required]),
       addressCityTown: new FormControl('',[Validators.required]),
       postCode: new FormControl('',[Validators.required]),
       country: new FormControl('',[Validators.required]),
       phonePrefix: new FormControl('',[Validators.required]),
       phone: new FormControl('',[Validators.required])
            }
          )
          this.personalForm=new FormGroup(
            {
Firstname: new FormControl('',[Validators.required]),
Lastname: new FormControl('',Validators.required),
Email: new FormControl('',Validators.email),
Phone: new FormControl('',Validators.required),
Password: new FormControl('',Validators.required),
Confirmpassword: new FormControl('',Validators.required)
            }
          )
  }
registerOrg=this.builder.group({
personal:this.builder.group({
  Firstname:this.builder.control('',Validators.required),
  Lastname:this.builder.control('',Validators.required),
  Email:this.builder.control('',Validators.email),
  Phone:this.builder.control('',Validators.required),
  Password:this.builder.control('',Validators.required),
  Confirmpassword:this.builder.control('',Validators.required)
},{validators:this.ComparePassword('Password','Confirmpassword')}),
organisation:this.builder.group({
  orgName: this.builder.control('',[Validators.required]),
  shortCode: this.builder.control('',[Validators.required]),
  gstNumber: this.builder.control('',[Validators.required]),
  addressStreet1: this.builder.control('',[Validators.required]),
  addressStreet2: this.builder.control('',[Validators.required]),
  addressCityTown: this.builder.control('',[Validators.required]),
  postCode: this.builder.control('',[Validators.required]),
  country: this.builder.control('',[Validators.required]),
  phonePrefix: this.builder.control('',[Validators.required]),
  phone: this.builder.control('',[Validators.required])
}),
 st3:this.builder.group({
   file: this.builder.control(''),
charityno: this.builder.control('')
 })
});

get personalform(){
  return this.registerOrg.get("personal") as FormGroup;
}
get orgform(){
  return this.registerOrg.get("organisation") as FormGroup;
}
get st3(){
  return this.registerOrg.get("st3") as FormGroup;
}
get controls(){
  return this.registerOrg.controls;
}
  addOrganisation(){
//     this.OrganisationDTO.orgName = this.orgForm.get('orgName')?.value;
//     this.OrganisationDTO.shortCode = this.orgForm.get('shortCode')?.value;
// this.OrganisationDTO.gstNumber = this.orgForm.get('gstNumber')?.value;
// this.OrganisationDTO.addressStreet1 = this.orgForm.get('addressStreet1')?.value;
// this.OrganisationDTO.addressStreet2 = this.orgForm.get('addressStreet2')?.value;
// this.OrganisationDTO.addressCityTown = this.orgForm.get('addressCityTown')?.value;
// this.OrganisationDTO.postCode = this.orgForm.get('postCode')?.value;
// this.OrganisationDTO.country = this.orgForm.get('country')?.value;
// this.OrganisationDTO.phonePrefix = this.orgForm.get('phonePrefix')?.value;
// this.OrganisationDTO.phone = this.orgForm.get('phone')?.value;
this.PersonalDTO.Firstname=this.personalform.get("Firstname")?.value;
this.PersonalDTO.Lastname=this.personalform.get("Lastname")?.value;
this.PersonalDTO.Email=this.personalform.get("Email")?.value;
this.PersonalDTO.Phone=this.personalform.get("Phone")?.value;
this.PersonalDTO.Password=this.personalform.get("Password")?.value;

this.OrganisationDTO.orgName = this.orgform.get("orgName")?.value;
    this.OrganisationDTO.shortCode = this.orgform.get('shortCode')?.value;
this.OrganisationDTO.gstNumber = this.orgform.get('gstNumber')?.value;
this.OrganisationDTO.addressStreet1 = this.orgform.get('addressStreet1')?.value;
this.OrganisationDTO.addressStreet2 = this.orgform.get('addressStreet2')?.value;
this.OrganisationDTO.addressCityTown = this.orgform.get('addressCityTown')?.value;
this.OrganisationDTO.postCode = this.orgform.get('postCode')?.value;
this.OrganisationDTO.country = this.orgform.get('country')?.value;
this.OrganisationDTO.phonePrefix = this.orgform.get('phonePrefix')?.value;
this.OrganisationDTO.phone = this.orgform.get('phone')?.value;
    console.log(this.OrganisationDTO);
console.log(this.PersonalDTO);

this._user.addUser(this.PersonalDTO).subscribe(
  (data:any)=>{
    this._organisation.addOrganisation(this.OrganisationDTO).subscribe(
      (data:any)=>{
        Swal.fire('Success!', 'Organisation Added', 'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !', 'Server Error !', 'error');
      }
    )
  }
  // (error)=>{
  //   console.log(error);
  //   Swal.fire('Error !', 'Error adding user', 'error');
  // }

  );
    // this._organisation.addOrganisation(this.OrganisationDTO).subscribe(

    //   (data:any)=>{
    //     Swal.fire('Success!', 'Organisation Added', 'success');
    //   },
    //   (error)=>{
    //     console.log(error);
    //     Swal.fire('Error !', 'Server Error !', 'error');
    //   }

    // );

    this._router.navigate(['/organisation']);
  }
addorg(){
  if(this.registerOrg.valid){
    console.log(this.registerOrg.value);
    this.registerOrg.get("orgName")?.value;
  }

}
ComparePassword(password: any,confpassword: any){
  return (formGroup:FormGroup)=>{
    const passwordcontrol= formGroup.controls[password];
  const confpasswordcontrol=formGroup.controls[confpassword];
  if(confpasswordcontrol.errors && !confpasswordcontrol.errors['ComparePassword'])
  {
    return;
  }
  if(passwordcontrol.value != confpasswordcontrol.value){
    confpasswordcontrol.setErrors({ComparePassword: true})
  }else{
    confpasswordcontrol.setErrors(null);
  }
  }
  }

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this._http.post(`${baseUrl}/Upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
        {
          if(event.total)
          {const total: number = event.total;
            this.progress = Math.round(100 * event.loaded / total); }
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}


