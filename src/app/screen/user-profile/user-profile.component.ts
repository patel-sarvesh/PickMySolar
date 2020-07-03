import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/shared/cache.service';
import { catchError } from 'rxjs/operators';
import { of , Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  private subscriptions: Subscription[] = [];

  constructor(
    private actRouter: ActivatedRoute,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    const id = this.actRouter.snapshot.queryParamMap.get('id') || null;
    (id) ? this.getUserFromServer(id) : this.getUserFromCache();
  }

  //  to get user from server side
  getUserFromServer(id) {
      this.subscriptions.push(this.cacheService.getUserWithId(id)
      .pipe(
        catchError(error => of(this.cacheService.openSnackBar(`Something went wrong. ${ error.message }`)))
      )
      .subscribe(res => {
        if (res) {
          this.user = res;
        }
      }));
  }

  //  to get user from cache service
  getUserFromCache() {
    this.subscriptions.push(this.cacheService.userData.subscribe(res => {
      if (res) {
        this.user = res;
      }
    }));
  }

  // to open image upload option for cover
  openCoverImageUpload() {
    const fileUpload = document.getElementById('coverImgUpload');
    fileUpload.click();
  }

  // to open image upload option for profile
  openProfileImageUpload() {
    const fileUpload = document.getElementById('profileImgUpload');
    fileUpload.click();
  };

  // to get upload images
  onFileInput(event, type) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setImage(reader, type);
    }
  };

  setImage(reader, type) {
    if (type === 'profile') {
      this.user.profileImage = reader.result as string;
      this.cacheService.updateUserProfileImage(this.user)
    } else {
      this.user.coverImage = reader.result as string;
      this.cacheService.updateUserCoverImage(this.user);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    }) 
  }
}
