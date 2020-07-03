import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CacheService } from 'src/app/shared/cache.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLogin: Observable<boolean>;
  onLoginPage: boolean = true;
  private subscription: Subscription;

  constructor(
    private cacheService: CacheService,
  ) { }

  ngOnInit(): void {
    this.isLogin = this.cacheService.isLoginData;
    this.subscription = this.cacheService.userData.subscribe(res => {
      if (res) {
        this.user = res;
      }
    });
  }
  
  logout() {
    this.cacheService.doLogout();
  }

  navigateToUrl(url) {
    this.onLoginPage = (url === 'login') ? true : false;
    this.cacheService.navigateTo(url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
