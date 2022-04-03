import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLoginComponent} from './login/user-login/user-login.component';
import {UserTodoComponent} from './user-details/user-todo/user-todo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: UserLoginComponent
  }
  ,
  {
    path: 'userList',
    component: UserTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
