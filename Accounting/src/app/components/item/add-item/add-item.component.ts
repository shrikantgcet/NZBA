import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public addItemForm!: FormGroup;
  orgId: any;
  constructor(private _activateRoute: ActivatedRoute, private _item: ItemService, private _router: Router) { }


  ItemDTO =   {name: '', amount: '', description: '', itemcode: '', organisationId: ''};


  ngOnInit(): void {
    this.orgId=this._activateRoute.parent?.snapshot.paramMap.get('id');

    this.addItemForm = new FormGroup(
      {
        name: new FormControl('',Validators.required),
        description: new FormControl('',Validators.required),
        amount: new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$')]),
        itemcode: new FormControl('',Validators.required)
      }
    )
  }


  addItem(){

    this.ItemDTO.name = this.addItemForm.get('name')?.value;
    this.ItemDTO.amount = this.addItemForm.get('amount')?.value;
    this.ItemDTO.description = this.addItemForm.get('description')?.value;
    this.ItemDTO.itemcode = this.addItemForm.get('itemcode')?.value;
    this.ItemDTO.organisationId = this.orgId;
    console.log(this.ItemDTO);
    this._item.addItem(this.ItemDTO).subscribe(

      (data:any)=>{
        Swal.fire('Success!', 'Item Added', 'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !', 'Server Error !', 'error');
      }

    );

    this._router.navigate(['/organisation/'+this.orgId+'/item']);
  }

}
