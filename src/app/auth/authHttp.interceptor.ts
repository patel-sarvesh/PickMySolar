import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageKeys } from '../shared/constants';
import { StorageHelper } from '../shared/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  in pratical will get token from server side after login
    //  based on the token we can add validation to backend side
    //  const token = StorageHelper.getLocal(StorageKeys.Token) || null;
    let newHeaders = request.headers;
    newHeaders = newHeaders.append('Content-Type', 'application/json');
    
    // same way we can add token into the header to send it with request
    // newHeaders = newHeaders.append('Authorization', 'token');
    const authReq = request.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}