import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { ListInvoicesComponent } from './components/invoices/list-invoices/list-invoices.component';
import { AddItemComponent } from './components/item/add-item/add-item.component';
import { EditItemComponent } from './components/item/edit-item/edit-item.component';
import { ItemComponent } from './components/item/view-item/item.component';
import { EditOrgComponent } from './components/organisation/edit-org/edit-org.component';
import { RegisterOrgComponent } from './components/organisation/register-org/register-org.component';
import { ViewOrgComponent } from './components/organisation/view-org/view-org.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
/*const routes: Routes = [
{
  path:'',
  component: HomeComponent,
  children:[

   {
     path:'dashboard',
     component:DashboardComponent
   },
   {
    path:'customer',
    component:ListCustomerComponent
   },
   {
    path:'invoice',
    component:ListInvoicesComponent
   },
   {
    path:'organisation',
    component:ViewOrgComponent
   },
   {
    path:'edit-organisation/:id',
    component:EditOrgComponent
   },
   {
    path:'register-organisation',
    component:RegisterOrgComponent
   }
  ],

},


];
*/


const routes: Routes = [

    {
      path:'organisation',
      component:ViewOrgComponent
     },
     {
      path:'edit-organisation/:id',
      component:EditOrgComponent
     },
     {
      path:'register-organisation',
      component:RegisterOrgComponent
     },
     {
      path:'login',
      component:LoginComponent
     },

     {
      path:'organisation/:id',
      component:HomeComponent,
      children:[

        {
          path:'dashboard',
          component:DashboardComponent
        },
        {
         path:'customer',
         component:ListCustomerComponent
        },
        {
         path:'invoice',
         component:ListInvoicesComponent
        },
        {
          path:'item',
          component:ItemComponent
        },
        {
          path:'add-item',
          component:AddItemComponent
        },
        {
          path:'edit-item/:id',
          component:EditItemComponent
        },
        {
          path:'add-customer',
          component:AddCustomerComponent
        },
        {
          path:'edit-customer/:id',
          component:EditCustomerComponent
        }

       ],
     },
     {
      path:'',
      component: ViewOrgComponent,
    }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
