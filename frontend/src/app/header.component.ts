import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
<header class="site-header">
  <div class="wrap">
    <a class="brand" [routerLink]="['/']">
      <img src="/logo.svg" alt="NZBA" width="28" height="28" />
      <span>NZBA</span>
    </a>
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/contact" routerLinkActive="active">Contact</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a class="signup" routerLink="/signup" routerLinkActive="active">Sign Up</a>
    </nav>
    <div class="auth">
      <button *ngIf="!loggedIn" (click)="login()">Login</button>
      <button *ngIf="loggedIn" (click)="logout()">Logout</button>
    </div>
  </div>
</header>
`,
  styles: [`
.site-header{position:sticky;top:0;background:#fff;border-bottom:1px solid #eaeaea}
.wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 auto;max-width:1100px;padding:12px 20px}
.brand{display:flex;align-items:center;gap:8px;color:#111;text-decoration:none;font-weight:700;letter-spacing:.02em}
nav{display:flex;align-items:center;gap:14px} .auth button{margin-left:8px;background:#0078D4;color:#fff;border:none;border-radius:6px;padding:8px 10px}
nav a{color:#333;text-decoration:none;padding:6px 8px;border-radius:6px}
nav a.active{background:#f1f5ff;color:#0b49e6}
nav a.signup{background:#0b49e6;color:#fff}
`]
})
export class HeaderComponent {
  constructor(private msal: MsalService) {}
  get loggedIn() { return this.msal.instance.getAllAccounts().length > 0; }
  login() { this.msal.loginRedirect(); }
  logout() { this.msal.logoutRedirect(); }
}
