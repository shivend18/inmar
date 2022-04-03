import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {map} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const selectedUserDetails: NavigationExtras = {
  state: {
    selectedUserDetails: {}
  }
};

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  userName: string;
  password: string;
  loginValidationForm: FormGroup;
  messageString: string;
  constructor(private loginSrv: LoginService, public router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.messageString = '';
    this.loginValidationForm = this.formBuilder.group({
      userName: [this.userName, Validators.required],
      password: [this.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  userLogin(): void{
    this.loginSrv.fetchLoginData().pipe(
      map((userList) => {
        let userObj = [];
        userList.forEach((list) => {
          userObj.push({
            username: list.username,
            fullName: list.name,
            id: list.id
          });
        });
        return userObj;
      })
    ).subscribe((userList) => {
      const isUserExist = userList.find((item) => {
        return item.username === this.userName;
      });
      if ( isUserExist ){
        selectedUserDetails.state.selectedUserDetails = isUserExist;
        this.router.navigateByUrl('/userList', selectedUserDetails);
      } else{
        this.showUserDoesNotExist();
      }
    });
  }

  clear(): void{
    this.userName = '';
    this.password = '';
    this.messageString = '';
  }

  disabledSaveEditButton(): boolean{
    return this.loginValidationForm.controls.userName.status === 'INVALID' ||
      this.loginValidationForm.controls.password.status === 'INVALID';
  }
  showUserDoesNotExist(): void {
    this.messageString = 'No user with username ' + this.userName + ' was found.';
  }

}
