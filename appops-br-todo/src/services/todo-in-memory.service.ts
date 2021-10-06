import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoInMemoryService {

  private todosUrl = 'api/todos';

  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  getToDosByPage(pageNumber: number, pageSize: number): Promise<Object> {

    let promise = new Promise((resolve, reject) => {
      this.httpClient.get(this.todosUrl).toPromise().then(
        result => {
          resolve(result);
          console.log(result);
        },
        error => {
          reject(error);
          console.log(error);
        }
      );
    });

    return promise;
  }
}
