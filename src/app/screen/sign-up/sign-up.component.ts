import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { CacheService } from 'src/app/shared/cache.service';
import { Roles } from '../../shared/constants';
import { StorageHelper } from 'src/app/shared/local-storage.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login/login.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  roles: string[];  

  constructor(
    private formBuilder: FormBuilder,
    private cacheService: CacheService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    StorageHelper.clear();
    this.signUpForm = this.formBuilder.group({
      name: [''],
      username: [''],
      emailId: ['', Validators.email],
      password: ['', Validators.minLength(6)],
      role: ['']
    });
    this.roles = Roles;
  }

  submit(e) {
    e.preventDefault();
    if (this.signUpForm.valid) {
      const user: User = this.signUpForm.value;
      user.createdDate = this.datePipe.transform(Date.now(),'yyyy-MM-dd hh:mm:ss');
      this.cacheService.doSignUp(this.signUpForm.value);
    }
  }

}
