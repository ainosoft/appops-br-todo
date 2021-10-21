
package org.appops.todo.service;


import com.demo.AddressBook.slim.AddressBookSlim;
import java.util.ArrayList;
import org.appops.core.service.RequestMethod;
import org.appops.core.service.annotation.ServiceOp;
import org.appops.todo.core.TodoService;


@TodoService
public interface TodoApi {

  @ServiceOp(method = RequestMethod.POST, path = "addNewTodo")
  public ArrayList<TodoSlim> addNewTodo(String todoName) throws Exception;

  @ServiceOp(method = RequestMethod.GET, path = "getTodoList")
  public ArrayList<TodoSlim> getTodoList() throws Exception;

  @ServiceOp(method = RequestMethod.POST, path = "deleteTodo")
  public ArrayList<TodoSlim> deleteTodo(Integer todoId) throws Exception;

  @ServiceOp(method = RequestMethod.GET, path = "getAddresses")
  public ArrayList<AddressBookSlim> getAddressList() throws Exception;

  @ServiceOp(method = RequestMethod.GET, path = "sayHello")
  public String sayHello(String name);

}
