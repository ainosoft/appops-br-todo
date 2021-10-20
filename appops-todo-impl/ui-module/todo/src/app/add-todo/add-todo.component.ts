import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoSlim } from 'src/common/TodoSlim';
import { TodoApi } from "src/server-integration/impl/TodoApi.js";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(private router: Router) { }


  todoForm = new FormGroup({
    id: new FormControl(null),
    todoName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  submitted: boolean;
  formControls = this.todoForm.controls;

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      if (this.todoForm.get('id').value == null) {
        this.addTodo(this.todoForm.value);
      }
    }
  }
  todoService = new TodoApi();
  addTodo(TodoData: any) {
    console.log("Inside addTodo", TodoData);
    let todoName = TodoData.todoName;
    let todoSlim = new TodoSlim();
    todoSlim.setTodoId = TodoData.todoId;
    todoSlim.setTodoName = TodoData.todoName;

    this.todoService.addNewTodo(todoName).setServiceName("TodoService").post("/addNewTodo").then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
    this.router.navigate(['todo-grid']);
  }

  onCancel() {
    console.log("Inside onCancel");
    this.router.navigate(['todo-grid']);
  }


}
