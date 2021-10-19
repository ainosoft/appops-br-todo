import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDo } from 'src/assets/TodoData';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(private router: Router) { }


  todoForm = new FormGroup({
    id: new FormControl(null),
    todoId: new FormControl('', Validators.required),
    todoName: new FormControl('', Validators.required),
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

  addTodo(TodoData: any) {
    console.log("Inside addTodo", TodoData);
    ToDo.push({ todoId: TodoData.todoId, todoName: TodoData.todoName });
    console.log("ToDo array", ToDo)
    this.router.navigate(['todo-grid']);
  }

  onCancel() {
    console.log("Inside onCancel");
    this.router.navigate(['todo-grid']);
  }


}
