import { Component } from '@angular/core';
@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
<footer class="site-footer">
  <div class="wrap">
    <span>© {{year}} NZBA Accounting</span>
    <a href="/about">About</a>
  </div>
</footer>
`,
  styles: [`
.site-footer{margin-top:40px;border-top:1px solid #eaeaea}
.wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 auto;max-width:1100px;padding:14px 20px;color:#666}
.wrap a{color:#666;text-decoration:none}
`]
})
export class FooterComponent { year = new Date().getFullYear(); }
