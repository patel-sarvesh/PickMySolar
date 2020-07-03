import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SignUpComponent } from './sign-up.component';
import { AngularMaterialModule } from '../../angular-material.module';

const signUpRoutes: Routes = [
    { path: '', component: SignUpComponent, canActivate: [] },
]

@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        RouterModule.forChild(signUpRoutes),
        AngularMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    exports: [RouterModule],
    providers: [DatePipe]
})

export class LazySignUpModule { }