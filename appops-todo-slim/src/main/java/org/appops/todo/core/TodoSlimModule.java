
package org.appops.todo.core;


import org.appops.core.annotation.SlimModule;
import org.appops.slim.base.injection.ServiceSlimModule;
import org.appops.todo.service.TodoApi;

@SlimModule(serviceName = TodoService.class)
public class TodoSlimModule extends ServiceSlimModule {
  @Override
  public void configureModule() {
    bindServiceApi(TodoApi.class);
  }
}


