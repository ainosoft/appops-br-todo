package com.demo.AddressBook.service;

import java.io.IOException;
import org.appops.core.service.RequestMethod;
import org.appops.core.service.annotation.ServiceOp;
import com.demo.AddressBook.core.AddressBook;

@AddressBook
public interface HelloService {

  @ServiceOp(method = RequestMethod.GET, path = "sayHello")
  public String sayHello(String name);
}