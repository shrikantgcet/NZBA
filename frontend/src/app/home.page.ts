import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-home',
  template: `
<section class="page">
  <h1>Welcome to NZBA</h1>
  <p class="lead">Accounting software made simple.</p>
</section>
`,
  styles: [`.page{max-width:1100px;margin:24px auto;padding:0 20px}.lead{color:#666}`]
})
export class HomePage {}
