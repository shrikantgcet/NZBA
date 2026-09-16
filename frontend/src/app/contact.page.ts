import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  template: `
<section class="page">
  <h1>Contact</h1>
  <form class="stack" (ngSubmit)="submit()">
    <label>Name<input name="name" [(ngModel)]="name" required/></label>
    <label>Email<input type="email" name="email" [(ngModel)]="email" required/></label>
    <label>Message<textarea name="message" [(ngModel)]="message" rows="4" required></textarea></label>
    <button type="submit">Send</button>
    <p class="note" *ngIf="submitted">Thanks, we will be in touch.</p>
  </form>
</section>
`,
  styles: [`.stack{display:flex;flex-direction:column;gap:12px;max-width:520px}
input,textarea{padding:10px;border:1px solid #d0d7de;border-radius:8px;font:inherit}
button{align-self:flex-start;background:#0b49e6;color:#fff;border:none;border-radius:8px;padding:10px 14px}
label{display:flex;flex-direction:column;gap:6px}
.note{color:#0a7f27}`]
})
export class ContactPage { name=''; email=''; message=''; submitted=false; submit(){ this.submitted=true; }}
