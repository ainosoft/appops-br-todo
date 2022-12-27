
package org.appops.todo.store;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import org.appops.todo.service.TodoSlim;

public class TodoStore {

  ArrayList<TodoSlim> todoList = new ArrayList<TodoSlim>();

  public TodoStore() {
    createMockData();
  }

  private static AtomicInteger ID_GENERATOR = new AtomicInteger(3);

  private void createMockData() {
    TodoSlim todo1 = new TodoSlim();
    todo1.setTodoId(1);
    todo1.setTodoName("Todo1");

    TodoSlim todo2 = new TodoSlim();
    todo2.setTodoId(2);
    todo2.setTodoName("Todo2");

    TodoSlim todo3 = new TodoSlim();
    todo3.setTodoId(3);
    todo3.setTodoName("Todo3");

    TodoSlim todo4 = new TodoSlim();
    todo4.setTodoId(4);
    todo4.setTodoName("Todo4");


    todoList.add(todo1);
    todoList.add(todo2);
    todoList.add(todo3);
    todoList.add(todo4);
  }

  public ArrayList<TodoSlim> getTodoList() {
    return todoList;
  }

  public ArrayList<TodoSlim> addNewTodo(String todoName) {
    TodoSlim newTodoSlim = new TodoSlim();
    Integer todoId = ID_GENERATOR.getAndIncrement();
    newTodoSlim.setTodoId(todoId);
    newTodoSlim.setTodoName(todoName);
    todoList.add(newTodoSlim);
    return todoList;
  }

  public ArrayList<TodoSlim> deleteTodo(Integer todoId) {
    for (int i = 0; i < todoList.size(); i++) {
      if (todoList.get(i).getTodoId() == todoId) {
        todoList.remove(i);
      }
    }
    return todoList;
  }

}
