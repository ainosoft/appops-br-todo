import { Component, OnInit } from '@angular/core';
import { GridConfig } from 'projects/enterprise-grid/src/public-api';
import { TodoActionDispatcher } from 'src/action-dispatcher/TodoActionDispatcher';
import { GridData } from '../../../projects/enterprise-grid/src/action/GridData';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, GridData {

  gridData: GridData = this;
  todoActionDispatcher = new TodoActionDispatcher();
  gridConfig = new GridConfig();

  constructor() { }

  getFirstPage(id: number, pageSize: number): Promise<any> {
    return null;
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
