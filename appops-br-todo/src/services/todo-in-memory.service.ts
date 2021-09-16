import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TodoInMemoryService {

  private todosUrl = 'api/todos';

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  getToDosByPage(pageNumber: number, pageSize: number): Observable<any> {
    return this.httpClient.get(this.todosUrl);
  }
}
