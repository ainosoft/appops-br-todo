
package com.demo.AddressBook.impl;

public class HelloServiceImpl implements com.demo.AddressBook.service.HelloService {

  @Override
  public String sayHello(String name) {
    return "Hello " + name + " !";
  }

}

