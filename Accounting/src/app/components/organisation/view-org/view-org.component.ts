import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-view-org',
  templateUrl: './view-org.component.html',
  styleUrls: ['./view-org.component.css']
})



export class ViewOrgComponent implements OnInit {


  displayedColumns: string[] = ['orgName', 'shortCode', 'gstNumber', 'addressStreet1', 'addressCityTown', 'postCode','phone','action', 'manage'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snack:MatSnackBar, private _organisation: OrganisationService) { }

  OrganisationDTO:any = [];

 
  
  ngOnInit(): void {
   
    this._organisation.getOrganisations().subscribe((data:any)=>{
    this.OrganisationDTO=data;
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
/*
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
*/
// navigate(){
//   alert('clicked');
// }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOrganisation(orgId:any){
    console.log(orgId);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this Organisation'

    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._organisation.deleteOrganisation(orgId).subscribe(
          (data)=>{
            this._snack.open('Organisation Deleted', 'OK', {
              duration:3000
            });
            //if dont want to make call to backend but lastdata doesn't go away after deletion
            /*this.dataSource= new MatTableDataSource(this.OrganisationDTO.filter((org:any)=>org.id!= orgId));  
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort
            */

            //call get data again
            this._organisation.getOrganisations().subscribe((data:any)=>{
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
