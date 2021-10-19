package com.demo.AddressBook.injection;

import com.google.inject.Inject;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import org.appops.core.annotation.SlimModule;
import org.appops.slim.base.injection.ServiceSlimModule;
import com.demo.AddressBook.core.AddressBook;
import com.demo.AddressBook.service.HelloService;

@SlimModule(serviceName = AddressBook.class)
public class AddressBookSlimModule extends ServiceSlimModule {

  @Override
  public void configureModule() {
    //TODO: Add bindings required for dependency injection within AddressBook.
    bindServiceApi(HelloService.class);
  }
 
}
