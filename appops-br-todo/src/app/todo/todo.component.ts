import { Component, Inject, OnInit } from '@angular/core';
import { TodoActionDispatcher } from 'src/action-dispatcher/TodoActionDispatcher';
import { ActionPosition, ActionTypes, GridConfig, GridData } from '@ainosoft/appops-br-core-components/components/enterprise-grid/dist/enterprise-grid';
import { TodoService } from 'src/server-integration/impl/TodoService.js';
import { TodoInMemoryService } from 'src/services/todo-in-memory.service';

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

  constructor(@Inject(TodoInMemoryService) private todoInMemoryService: TodoInMemoryService) { }

  ngOnInit() {
    this.setGridConfigurations();
  }

  setGridConfigurations(): void {

    this.gridConfig.setGridHeader = "Todo";
    this.gridConfig.setPageSize = 10;
    this.gridConfig.setTotalRecords = 10;

    this.gridConfig.addColumnConfig("id", "Id", 1);
    this.gridConfig.addColumnConfig("name", "Name", 2);

    this.gridConfig.featureConfig("enableActionToolbar", true);
    this.gridConfig.featureConfig("enableSearchToolbar", true);
    this.gridConfig.featureConfig("enableSearchPlaceholder", true);
    this.gridConfig.featureConfig("enableSearchBar", false);
    this.gridConfig.featureConfig("selectRow", true);

    this.gridConfig.actionConfig("onRowClick", true, "on-row-click", false);
    this.gridConfig.actionConfig("filterValue", true, "filter-value", false);
    this.gridConfig.actionConfig("getDataByPage", true, "get-data-by-page", false);

    this.gridConfig.actionConfig("getFirstPage", true, "get-first-page", false);
    this.gridConfig.actionConfig("getNextPage", true, "get-next-page", false);
    this.gridConfig.actionConfig("getPrevPage", true, "get-prev-page", false);

    this.gridConfig.actionConfig("deleteValue", true, "delete-todo", false, ActionTypes.entity, null , true, 'delete', 'Delete');
    this.gridConfig.actionConfig("addNewTodo", true, "add-new-todo", false, ActionTypes.core, null, true, "Add New Todo");

    this.gridConfig.actionConfig("deleteCheckedValues", true, "delete-checked-todos", true, ActionTypes.entity, ActionPosition.inplace, false, 'Delete', 'Delete');
    this.gridConfig.actionConfig("archiveMultipleTodos", true, "archive-multiple-todos", true, ActionTypes.entity, ActionPosition.inplace, true, 'archive', 'Archive');
    this.gridConfig.actionConfig("moveTodo", true, "move-todo", true, ActionTypes.entity, ActionPosition.inplace, true, 'drive_file_move', 'Move to');

    this.gridConfig.actionConfig("markAsImportant", true, "mark-as-important", true, ActionTypes.entity, ActionPosition.selector, true, 'Mark as important');
    this.gridConfig.actionConfig("addStar", true, "add-star", true, ActionTypes.entity, ActionPosition.selector, true, 'Add star');
  }

  /** Method to fetch the first set of records. */
  getFirstPage(id: number, pageSize: number): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.todoInMemoryService.getToDosByPage(id, pageSize).then(
        result => {
          resolve(result);
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
    });

    return promise;
  }

  getNextPage(id: number, pageSize: number): Promise<any> {
    return null;
  }
  
  onGridDataLoad(data: any): void {
    return null;
  }

}
