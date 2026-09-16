import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<section class="page auth">
  <h1>Sign Up</h1>
  <form [formGroup]="form" (ngSubmit)="submit()" class="stack">
    <label>Name<input formControlName="name" /></label>
    <label>Email<input type="email" formControlName="email" /></label>
    <label>Password<input type="password" formControlName="password" /></label>
    <button type="submit">Create Account</button> <button type="button" (click)="msal.loginRedirect()">Sign in with Microsoft</button>
    <p class="error" *ngIf="error">{{error}}</p>
  </form>
</section>
`,
  styles: [`.auth .stack{max-width:360px}.error{color:#c00}`]
})
export class SignupPage {
  form!: FormGroup;
  error: string | null = null;
  constructor(private fb: FormBuilder, public msal: MsalService) {
    this.form = this.fb.group({ name: ['', [Validators.required]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  }
  submit(){ if(this.form.invalid){ this.error='Please fill all fields correctly.'; return;} this.error=null; /* TODO: call API */ }
}
