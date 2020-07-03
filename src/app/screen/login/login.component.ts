import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CacheService } from 'src/app/shared/cache.service';
import { StorageHelper } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private cacheService: CacheService,
  ) { }

  ngOnInit(): void {
    StorageHelper.clear();
  }

  submit(e) {
    e.preventDefault();
    if (this.form.valid) {
      this.cacheService.doLogin(this.form.value);
    }
  }

}
