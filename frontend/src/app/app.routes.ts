import { Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AboutPage } from './about.page';
import { ContactPage } from './contact.page';
import { LoginPage } from './login.page';
import { SignupPage } from './signup.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'contact', component: ContactPage },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: '**', redirectTo: '' }
];
