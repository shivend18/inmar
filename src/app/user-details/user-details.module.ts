import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTodoComponent } from './user-todo/user-todo.component';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [UserTodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [UserTodoComponent]
})
export class UserDetailsModule { }
