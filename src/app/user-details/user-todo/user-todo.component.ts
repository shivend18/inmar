import { Component, OnInit } from '@angular/core';
import {UserDetailService} from '../../services/user-detail.service';
import {Router} from '@angular/router';

export interface UserToDoList{
  name: string;
  userId: number;
  completed: boolean;
  title: string;
}

@Component({
  selector: 'app-user-todo',
  templateUrl: './user-todo.component.html',
  styleUrls: ['./user-todo.component.scss']
})
export class UserTodoComponent implements OnInit {
  currentLoginUser;
  viewTodoList;
  originalTodoList: UserToDoList[] = [];
  isSelected = false;
  constructor(private userService: UserDetailService, private router: Router) {
    this.getRouteParameters();
  }

  ngOnInit(): void {
    this.getUserTodoList();
  }

  getRouteParameters(): void{
    const navigation = this.router.getCurrentNavigation();
    navigation && navigation.extras.state !== undefined ? this.currentLoginUser = navigation.extras.state.selectedUserDetails :
      this.router.navigateByUrl('/login');
  }

  getUserTodoList(): void {
    this.userService.fetchUserDetails().pipe().subscribe((toDoList) => {
      toDoList.forEach((list) => {
        this.originalTodoList.push({
          name: this.currentLoginUser.fullName,
          userId: list.userId,
          completed: list.completed,
          title: list.title
        });
      });
      this.filterTodoList(this.originalTodoList, false);
    });
  }

  private filterTodoList(toDoList, selected): void {
    let filteredTodoList;
    filteredTodoList =  toDoList.filter((list) => {
      return !selected ? list.userId ===  this.currentLoginUser.id : (list.completed  && list.userId ===  this.currentLoginUser.id);
    });
    this.viewTodoList = filteredTodoList;
  }

  selectCompletedTask(): void{
    this.filterTodoList(this.originalTodoList, this.isSelected);
  }
}
