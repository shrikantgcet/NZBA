import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _organisation: OrganisationService, private _route:ActivatedRoute) { }
  OrganisationDTO:any;
  orgId:any;

  ngOnInit(): void {

    //this.orgId=this._route.snapshot.params.id;
    this.orgId=this._route.parent?.snapshot.paramMap.get('id');

    this._organisation.getOrganisationById(this.orgId).subscribe(
      (data)=>{
        this.OrganisationDTO=data;
        console.log(this.OrganisationDTO);
      },
      (error)=>{
        console.log(error);
      }
    );

  }

}
