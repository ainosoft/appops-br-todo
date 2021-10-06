import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const todos = [
      { id: 1, name: 'Todo 1' },
      { id: 2, name: 'Todo 2' },
      { id: 3, name: 'Todo 3' },
      { id: 4, name: 'Todo 4' },
      { id: 5, name: 'Todo 5' },
      { id: 6, name: 'Todo 6' },
      { id: 7, name: 'Todo 7' },
      { id: 8, name: 'Todo 8' },
      { id: 9, name: 'Todo 9' },
      { id: 10, name: 'Todo 10' }
    ];

    return {todos};
  }

  genId(todos: any[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
