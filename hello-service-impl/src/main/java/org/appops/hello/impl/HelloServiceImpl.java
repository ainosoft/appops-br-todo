package org.appops.hello.impl;

import org.appops.hello.service.HelloServiceManager;

public class HelloServiceImpl implements HelloServiceManager {

  @Override
  public String sayHello(String name) {
    return "Hello " + name+" !";
  }

}

