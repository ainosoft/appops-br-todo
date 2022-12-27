import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoAngularGridComponent } from './todo-angular-grid/todo-angular-grid.component';

const routes: Routes = [
  { path: '', component: TodoAngularGridComponent },
  { path: 'todo-grid', component: TodoAngularGridComponent },
  { path: 'add-todo', component: AddTodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
