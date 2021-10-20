
package com.demo.AddressBook.injection;

import com.demo.AddressBook.core.AddressBook;
import com.demo.AddressBook.impl.AdddressImpl;
import com.demo.AddressBook.impl.HelloServiceImpl;
import com.demo.AddressBook.service.Address;
import com.demo.AddressBook.service.HelloService;
import com.demo.AddressBook.store.AddressBookStore;
import com.google.inject.Singleton;
import org.appops.core.annotation.ImplModule;
import org.appops.service.injection.ServiceModule;

@ImplModule(serviceName = AddressBook.class)
public class AddressBookModule extends ServiceModule {

  @Override
  public void configureModule() {
    // TODO: Add bindings required for dependency injection within AddressBook.
    bind(HelloService.class).to(HelloServiceImpl.class);
    bind(AddressBookStore.class).in(Singleton.class);
    bind(Address.class).to(AdddressImpl.class);
  }

}
