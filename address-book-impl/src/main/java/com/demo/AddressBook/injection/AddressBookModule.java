
package com.demo.AddressBook.injection;

import com.demo.AddressBook.core.AddressBook;
import com.demo.AddressBook.impl.HelloServiceImpl;
import com.demo.AddressBook.service.HelloService;
import org.appops.core.annotation.ImplModule;
import org.appops.service.injection.ServiceModule;

@ImplModule(serviceName = AddressBook.class)
public class AddressBookModule extends ServiceModule {

  @Override
  public void configureModule() {
    // TODO: Add bindings required for dependency injection within AddressBook.
    bind(HelloService.class).to(HelloServiceImpl.class);
  }

}
