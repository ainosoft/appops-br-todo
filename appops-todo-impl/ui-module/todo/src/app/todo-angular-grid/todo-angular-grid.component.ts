import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToDo } from 'src/assets/TodoData';
import { TodoApi } from "src/server-integration/impl/TodoApi.js";

export interface TodoData {
  todoId: number;
  todoName: string;
}

/** Constants used to fill up our data base. */
const IdArray: number[] = [
];

const NameArray: string[] = [
];


@Component({
  selector: 'app-todo-angular-grid',
  templateUrl: './todo-angular-grid.component.html',
  styleUrls: ['./todo-angular-grid.component.scss']
})
export class TodoAngularGridComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  todoData1;

  todoService = new TodoApi();

  constructor(private router: Router) {

    // console.log("inside todo-grid", ToDo);
    // for (let i = 0; i < ToDo.length; i++) {
    //   IdArray.push(ToDo[i].todoId);
    //   NameArray.push(ToDo[i].todoName);
    // }


    this.todoService.getTodoList().setServiceName("TodoService").get('/getTodoList').then(
      result => {
        console.log(result);
        this.todoData1 = result;
        for (let i = 0; i < result.length; i++) {
          IdArray.push(result[i].todoId);
          NameArray.push(result[i].todoName);
        }
        const todoData = Array.from({ length: result.length }, (_, k) => createNewUser(k));
        this.dataSource = new MatTableDataSource(todoData);
      },
      error => {
        console.log(error);
      }
    )

  }



  ngOnInit(): void {

  }


  displayedColumns: string[] = ['todoId', 'todoName'];
  dataSource: MatTableDataSource<TodoData>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewTodo() {
    console.log("Inside addNewTodo");
    this.router.navigate(['add-todo']);
  }


}

/** Builds and returns a new Framework. */
function createNewUser(id: number): TodoData {

  const id1 = IdArray[id];
  const name = NameArray[id];

  return {
    todoId: id1,
    todoName: name,
  };
}