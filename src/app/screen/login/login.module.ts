import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../angular-material.module';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [] },
]

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(loginRoutes),
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [RouterModule]
})

export class LazyLoginModule { }