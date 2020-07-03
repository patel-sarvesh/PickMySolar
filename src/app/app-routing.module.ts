import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./screen/login/login.module').then(m => m.LazyLoginModule)},
  {path: 'sign-up', loadChildren: () => import('./screen/sign-up/sign-up.module').then(m => m.LazySignUpModule)},
  {path: 'user-list', loadChildren: () => import('./screen/user-list/user-list.module').then(m => m.LazyUserListModule)},
  {path: 'profile', loadChildren: () => import('./screen/user-profile/user-profile.module').then(m => m.LazyUserProfileModule)},
  {path: '**', redirectTo: 'login',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
