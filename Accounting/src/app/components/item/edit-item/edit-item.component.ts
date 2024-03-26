import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
editItemForm!: FormGroup;

  constructor(private activatedRoute:ActivatedRoute, private _router:Router, private _item: ItemService, private _snack:MatSnackBar) { }

  orgId: any;
  itemId=0;
  ItemDTO:any;

  ngOnInit(): void {
    this.orgId=this.activatedRoute.parent?.snapshot.paramMap.get('id');
    this.itemId=this.activatedRoute.snapshot.params.id;

    this.editItemForm = new FormGroup(
      {
        name: new FormControl('',Validators.required),
        description: new FormControl('',Validators.required),
        amount: new FormControl('',Validators.required),
        itemcode: new FormControl('',Validators.required)
      }
    )

    this._item.getItemById(this.itemId).subscribe(
      (data)=>{
        this.ItemDTO=data;
        console.log(this.ItemDTO);
        this.editItemForm = new FormGroup(
          {
            name: new FormControl(this.ItemDTO.name,Validators.required),
            description: new FormControl(this.ItemDTO.description,Validators.required),
            amount: new FormControl(this.ItemDTO.amount,Validators.required),
            itemcode: new FormControl(this.ItemDTO.itemCode,Validators.required)
          }
        )
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  editItem(){
    this.ItemDTO.name = this.editItemForm.get('name')?.value;
    this.ItemDTO.amount = this.editItemForm.get('amount')?.value;
    this.ItemDTO.description = this.editItemForm.get('description')?.value;
    this.ItemDTO.itemcode = this.editItemForm.get('itemcode')?.value;
    this.ItemDTO.organisationId = this.orgId;
    console.log(this.ItemDTO);

    this._item.updateItem(this.itemId, this.ItemDTO).subscribe(
      (data)=>{
        Swal.fire('Success!', 'Item Updated', 'success');
      },
      (error)=>{
        Swal.fire('Error', 'error in updating', 'error');
      }

    );

    this._router.navigate(['/organisation/'+this.orgId+'/item']);
  }


}
