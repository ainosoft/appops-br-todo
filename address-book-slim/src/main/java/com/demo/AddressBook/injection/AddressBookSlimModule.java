
package com.demo.AddressBook.injection;

import com.demo.AddressBook.core.AddressBook;
import com.demo.AddressBook.service.Address;
import com.demo.AddressBook.service.HelloService;
import org.appops.core.annotation.SlimModule;
import org.appops.slim.base.injection.ServiceSlimModule;

@SlimModule(serviceName = AddressBook.class)
public class AddressBookSlimModule extends ServiceSlimModule {

  @Override
  public void configureModule() {
    bindServiceApi(HelloService.class);
    bindServiceApi(Address.class);
  }

}
