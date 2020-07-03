import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { StorageHelper } from '../local-storage.service';
import { StorageKeys } from '../constants';
import { CacheService } from '../cache.service';
import { User } from '../user.model';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private cacheService: CacheService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const user = StorageHelper.getLocal<User>(StorageKeys.User);
    if (user && user.role !== expectedRole) {
      this.cacheService.openSnackBar('Please Login as Admin');
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
