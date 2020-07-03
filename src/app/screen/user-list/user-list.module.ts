import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { RoleGuard } from '../../shared/gaurd/role-guard';
import { AuthGuard } from '../../shared/gaurd/auth-guard';
import { AngularMaterialModule } from 'src/app/angular-material.module';

const userListRoutes: Routes = [
    { path: '', component: UserListComponent, canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'Admin'}},
]

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(userListRoutes),
        AngularMaterialModule,
        CommonModule
    ],
    exports: [RouterModule]
})

export class LazyUserListModule { }