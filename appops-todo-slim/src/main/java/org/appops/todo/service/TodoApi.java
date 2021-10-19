
package org.appops.todo.service;


import java.util.ArrayList;
import org.appops.core.service.RequestMethod;
import org.appops.core.service.annotation.ServiceOp;
import org.appops.todo.core.TodoService;


@TodoService
public interface TodoApi {

  @ServiceOp(method = RequestMethod.POST, path = "addNewTodo")
  public void addNewTodo() throws Exception;

  @ServiceOp(method = RequestMethod.POST, path = "getTodoList")
  public ArrayList<TodoSlim> getTodoList() throws Exception;

  @ServiceOp(method = RequestMethod.GET, path = "sayHello")
  public String sayHello(String name);

}
