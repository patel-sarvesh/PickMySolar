import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarTimeDuration, StorageKeys } from './constants';
import { User } from './user.model';
import { StorageHelper } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})

export class CacheService {
    private REST_API_SERVER = "http://localhost:3000";
    private user = new BehaviorSubject<User>(null);
    private isLogin = new BehaviorSubject<boolean>(false);
    readonly userData = this.user.asObservable();
    readonly isLoginData = this.isLogin.asObservable();
    constructor(
        private http: HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {}

    doLogin(user) {
        this.http.get<User[]>(`${this.REST_API_SERVER}/users?username=${user.username}`)
        .pipe(catchError(error => of (this.openSnackBar(error.message))))
        .subscribe( (res: User[]) => {
            if (res.length && res[0].password === user.password) {
                (StorageHelper.getLocal(StorageKeys.IsLogin)) ? 
                    this.setUserData(res) : this.setFirstTimeUserData(res);
            } else {
                this.openSnackBar('Wrong Password');
            }
            
        });
    }

    private setUserData(res) {
        this.user.next(res[0]);
        this.isLogin.next(true);
    }

    private setFirstTimeUserData(res) {
        this.setUserData(res);
        StorageHelper.setLocal(StorageKeys.IsLogin, true);
        StorageHelper.setLocal(StorageKeys.User, res[0]);
        res[0].role === 'Admin' ? 
        this.navigateTo('user-list') : 
        this.navigateTo('profile');
    }

    doLogout() {
        this.user.next(null);
        this.isLogin.next(false);
        this.navigateTo('login');
    }

    doSignUp(userDetails: User) {
        this.http.post(`${this.REST_API_SERVER}/users`, userDetails)
        .pipe(
            catchError(error => of (this.openSnackBar(`Something went wrong. ${ error.message }`)))
        )
        .subscribe((res: User) => {
            if (res) {
                this.user.next(res);
                this.isLogin.next(true);
                StorageHelper.setLocal(StorageKeys.IsLogin, true);
                StorageHelper.setLocal(StorageKeys.User, res);
                this.navigateTo('user-list');
            }
        })
    }

    // get user with id
    getUserWithId(id) {
        return this.http.get<User>(`${this.REST_API_SERVER}/users/${id}`);
    }

    // get all users
    getUserList() {
        return this.http.get<User[]>(`${this.REST_API_SERVER}/users`);
    }

    // update user profile image with patch call 
    updateUserProfileImage(user: User) {
        this.http.patch(`${this.REST_API_SERVER}/users/${user.id}`, {profileImage: user.profileImage})
        .pipe(
            catchError(error => of(this.openSnackBar('Please try again later.')))
        )
        .subscribe( (res: User) => {
            if (res) {
                this.user.next(res);
            }
        })
    }

    // update user cover image with patch call 
    updateUserCoverImage(user: User) {
        this.http.patch(`${this.REST_API_SERVER}/users/${user.id}`, {coverImage: user.coverImage})
        .pipe(
            catchError(error => of(this.openSnackBar('Please try again later.')))
        )
        .subscribe( (res: User) => {
            if (res) {
                this.user.next(res);
            }
        })
    }

    // common snackbar for message
    openSnackBar(message: string) {
        this._snackBar.open(message, null, {
          duration: SnackBarTimeDuration.timeInSecond, 
        });
    }

    // common navigation function 
    navigateTo(url: string) {
        this.router.navigateByUrl(url);
    }

    // common navigation function with queryParams
    navigateToUserProfile(user: User) {
        this.router.navigate(['profile'], { queryParams: { id: user.id } });
    }

 }