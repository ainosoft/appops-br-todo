
package com.demo.AddressBook.helper;

import com.demo.AddressBook.config.AddressConfig;
import com.demo.AddressBook.slim.AddressBookSlim;
import com.demo.AddressBook.store.AddressBookStore;
import com.google.inject.Inject;
import java.util.ArrayList;
import org.appops.core.annotation.Config;

public class AddressHelper {

  private AddressConfig addressConfig;

  public ArrayList<AddressBookSlim> getAddressList() {
    AddressBookStore addressBookStore = new AddressBookStore();
    if (getAddressConfig().getLoadTestData() == true) {
      return addressBookStore.getAddressBookList();
    }
    return null;
  }

  public ArrayList<AddressBookSlim> addNewAddress(String address) {
    AddressBookStore addressBookStore = new AddressBookStore();
    return addressBookStore.addNewAddress(address);
  }

  public AddressConfig getAddressConfig() {
    return addressConfig;
  }

  @Inject
  public void setAddressConfig(@Config AddressConfig addressConfig) {
    this.addressConfig = addressConfig;
  }



}
