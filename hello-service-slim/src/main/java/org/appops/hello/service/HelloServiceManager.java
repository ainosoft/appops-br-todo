package org.appops.hello.service;

import org.appops.core.service.RequestMethod;
import org.appops.core.service.annotation.ServiceOp;
import org.appops.hello.core.HelloService;

@HelloService
public interface HelloServiceManager {

  @ServiceOp(method = RequestMethod.GET, path = "sayHello")
  public String sayHello(String name);
}