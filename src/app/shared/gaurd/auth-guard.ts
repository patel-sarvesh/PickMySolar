import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageHelper } from '../local-storage.service';
import { StorageKeys } from '../constants';
import { CacheService } from '../cache.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cacheService: CacheService,
  ) { }

  canActivate(): boolean {
    if (!StorageHelper.getLocal(StorageKeys.IsLogin)) {
      this.cacheService.openSnackBar('Please Login First');
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
