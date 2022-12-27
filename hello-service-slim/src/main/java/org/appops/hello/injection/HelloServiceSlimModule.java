package org.appops.hello.injection;

import org.appops.core.annotation.SlimModule;
import org.appops.hello.core.HelloService;
import org.appops.slim.base.injection.ServiceSlimModule;

@SlimModule(serviceName = HelloService.class)
public class HelloServiceSlimModule extends ServiceSlimModule {

  @Override
  public void configureModule() {
    //TODO: Add bindings required for dependency injection within HelloService.
    bindServiceApi(HelloService.class);
  }
 
}
