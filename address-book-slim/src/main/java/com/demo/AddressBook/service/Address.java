
package com.demo.AddressBook.service;

import com.demo.AddressBook.core.AddressBook;
import com.demo.AddressBook.slim.AddressBookSlim;
import java.util.ArrayList;
import org.appops.core.service.RequestMethod;
import org.appops.core.service.annotation.ServiceOp;

@AddressBook
public interface Address {

  @ServiceOp(method = RequestMethod.GET, path = "getAddressList")
  public ArrayList<AddressBookSlim> getAddressList();

  @ServiceOp(method = RequestMethod.POST, path = "addNewAddress")
  public ArrayList<AddressBookSlim> addNewAddress(String address);
}
