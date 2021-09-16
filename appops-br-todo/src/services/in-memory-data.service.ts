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
      { id: 11, name: 'Todo 1' },
      { id: 12, name: 'Todo 2' },
      { id: 13, name: 'Todo 3' },
      { id: 14, name: 'Todo 4' },
      { id: 15, name: 'Todo 5' },
      { id: 16, name: 'Todo 6' },
      { id: 17, name: 'Todo 7' },
      { id: 18, name: 'Todo 8' },
      { id: 19, name: 'Todo 9' },
      { id: 20, name: 'Todo 10' }
    ];

    return {todos};
  }

  genId(todos: any[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
