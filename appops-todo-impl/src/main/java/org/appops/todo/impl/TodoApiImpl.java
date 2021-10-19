
package org.appops.todo.impl;

import java.util.ArrayList;
import org.appops.todo.service.TodoApi;
import org.appops.todo.service.TodoSlim;

public class TodoApiImpl implements TodoApi {

  @Override
  public void addNewTodo() throws Exception {
    // TODO Auto-generated method stub

  }

  @Override
  public ArrayList<TodoSlim> getTodoList() throws Exception {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String sayHello(String name) {
    return "Hello " + name + " !";
  }

}
