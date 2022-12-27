
package org.appops.todo.impl;

import com.demo.AddressBook.service.Address;
import com.demo.AddressBook.slim.AddressBookSlim;
import com.google.inject.Inject;
import com.google.inject.Provider;
import java.util.ArrayList;
import org.appops.todo.service.TodoApi;
import org.appops.todo.service.TodoSlim;
import org.appops.todo.store.TodoStore;



public class TodoApiImpl implements TodoApi {

  private TodoStore todoStore;
  private Provider<Address> addressBookService;

  @Override
  public ArrayList<TodoSlim> addNewTodo(String todoName) throws Exception {
    return todoStore.addNewTodo(todoName);
  }

  @Override
  public ArrayList<TodoSlim> getTodoList() throws Exception {
    return todoStore.getTodoList();
  }

  @Override
  public String sayHello(String name) {
    return "Hello " + name + " !";
  }

  @Override
  public ArrayList<TodoSlim> deleteTodo(Integer todoId) throws Exception {
    return todoStore.deleteTodo(todoId);
  }

  @Override
  public ArrayList<AddressBookSlim> getAddressList() throws Exception {
    return addressBookService.get().getAddressList();
  }

  public TodoStore getTodoStore() {
    return todoStore;
  }

  @Inject
  public void setTodoStore(TodoStore todoStore) {
    this.todoStore = todoStore;
  }

  public Provider<Address> getAddressBookService() {
    return addressBookService;
  }

  @Inject
  public void setAddressBookService(Provider<Address> addressBookService) {
    this.addressBookService = addressBookService;
  }

  // public Address getAddressBookService() {
  // return addressBookService;
  // }
  //
  // @Inject
  // public void setAddressBookService(Address addressBookService) {
  // this.addressBookService = addressBookService;
  // }



}
