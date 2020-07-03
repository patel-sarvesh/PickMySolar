import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/shared/user.model';
import { CacheService } from 'src/app/shared/cache.service';
import { DisplayedColumns, TablePageSizeOptions, Roles } from '../../shared/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = DisplayedColumns;
  pageSizeOptions: number[] = TablePageSizeOptions;
  roles: any[] = [];
  private filterValues = {};
  private subscription: Subscription;

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private cacheService: CacheService,
  ) { }

  ngOnInit(): void {
    this.getAllUserList();
    this.setRolesFilter();
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // getting all user list
  private getAllUserList() {
    this.subscription = this.cacheService.getUserList()
    .pipe(
      catchError(error => of (this.cacheService.openSnackBar(`Something went wrong. ${ error.message }`)))
    )
    .subscribe((res: User[]) => {
      if (res.length) {
        this.dataSource.data = res;
      }
    })
  };

  // set roles filter object
  private setRolesFilter() {
    Roles.forEach(role => {
      this.roles.push({ value: role, isSelected: false, columnProp: 'role' });
    });
  }

  // click handler for filter selection
  filterChange(filter, key) {
    if (filter.isSelected) {
      this.filterValues[key] = filter.columnProp;
    } else {
      delete this.filterValues[key];
    }
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // filter logic based on selection of filter option
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const [search, col] of Object.entries(searchTerms)) {
        if (col.toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[search];
        }
      }

      // search in dataSource object
      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const [search, col] of Object.entries(searchTerms)) {
              search.trim().toLowerCase().split(' ').forEach(word => {
              if (data[col.toString()].toString().toLowerCase().indexOf(word) != -1) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  goToUserProfile(user) {
    this.cacheService.navigateToUserProfile(user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
