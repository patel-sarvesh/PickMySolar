import { Component, OnInit } from '@angular/core';
import { CacheService } from './shared/cache.service';
import { StorageHelper } from './shared/local-storage.service';
import { StorageKeys } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PickMySolar';

  constructor(
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    // we can use refresh token call once we ge it from backend
    const isLogin = StorageHelper.getLocal(StorageKeys.IsLogin) || null;
    const userData = StorageHelper.getLocal(StorageKeys.User);
    if (isLogin) {
      this.cacheService.doLogin(userData);
    }
  }
}
