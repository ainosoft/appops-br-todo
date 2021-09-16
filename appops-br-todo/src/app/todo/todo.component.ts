import { Component, Inject, OnInit } from '@angular/core';
import { TodoActionDispatcher } from 'src/action-dispatcher/TodoActionDispatcher';
import { GridConfig, GridData } from '@ainosoft/appops-br-core-components/components/enterprise-grid/dist/enterprise-grid';
import { TodoService } from 'src/server-integration/impl/TodoService.js';
import { TodoInMemoryService } from 'src/services/todo-in-memory.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, GridData {

  gridData: GridData = this;
  todoActionDispatcher = new TodoActionDispatcher();
  gridConfig = new GridConfig();
  todoService = new TodoService();

  constructor(@Inject(HttpClient) private todoInMemoryService: TodoInMemoryService) { }

  getFirstPage(id: number, pageSize: number): Promise<any> {
    return this.todoInMemoryService.getToDosByPage(id, pageSize).toPromise().then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  getNextPage(id: number, pageSize: number): Promise<any> {
    return null;
  }
  
  onGridDataLoad(data: any): void {
    return null;
  }

  ngOnInit() {
  }

}
