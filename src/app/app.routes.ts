import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

let title = "ProfSession"

export const routes: Routes = [
  {path: 'home', component: HomeComponent, title: title + " | Welcome"},
  {path: 'search', loadComponent: () => import('./pages/search/search.component').then(c => c.SearchComponent), title: title + " | Search"},
  {path: 'login', loadComponent: () => import('./pages/log-in/log-in.component').then(c => c.LogInComponent), title: title + " | Log in"},
  {path: 'register', loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent), title: title + " | Register"},
  {path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then( c => c.ProfileComponent), title: title + ' | Profile'},
  
  
  {path: '**', component: HomeComponent, title: title + " | Welcome"}
];
