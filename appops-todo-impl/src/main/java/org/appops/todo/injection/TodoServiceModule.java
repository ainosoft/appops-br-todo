
package org.appops.todo.injection;

import org.appops.core.annotation.ImplModule;
import org.appops.service.injection.ServiceModule;
import org.appops.todo.core.TodoService;
import org.appops.todo.impl.TodoApiImpl;
import org.appops.todo.service.TodoApi;

@ImplModule(serviceName = TodoService.class)
public class TodoServiceModule extends ServiceModule {

  @Override
  public void configureModule() {
    bind(TodoApi.class).to(TodoApiImpl.class);
  }

}
