import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from '../../shared/gaurd/auth-guard';
import { AngularMaterialModule } from 'src/app/angular-material.module';

const userProfileRoutes: Routes = [
    { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
]

@NgModule({
    declarations: [ 
        UserProfileComponent
    ],
    imports: [
        RouterModule.forChild(userProfileRoutes),
        AngularMaterialModule,
        CommonModule
    ],
    exports: [RouterModule]
})

export class LazyUserProfileModule { }