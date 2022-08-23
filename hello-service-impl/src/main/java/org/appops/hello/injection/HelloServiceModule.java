package org.appops.hello.injection;

import org.appops.core.annotation.ImplModule;
import org.appops.hello.impl.HelloServiceImpl;
import org.appops.hello.service.HelloServiceManager;
import org.appops.service.injection.ServiceModule;

@ImplModule(serviceName = HelloServiceManager.class)
public class HelloServiceModule extends ServiceModule {

  @Override
  public void configureModule() {
    //TODO: Add bindings required for dependency injection within HelloService.
    bind(HelloServiceManager.class).to(HelloServiceImpl.class);
  }
 
}
