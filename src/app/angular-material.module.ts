import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSelectModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSelectModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatExpansionModule
    ]
})

export class AngularMaterialModule { }