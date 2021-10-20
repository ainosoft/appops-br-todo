
package com.demo.AddressBook.impl;

import com.demo.AddressBook.helper.AddressHelper;
import com.demo.AddressBook.service.Address;
import com.demo.AddressBook.slim.AddressBookSlim;
import com.google.inject.Inject;
import java.util.ArrayList;

public class AdddressImpl implements Address {

  private AddressHelper addressHelper;

  @Override
  public ArrayList<AddressBookSlim> getAddressList() {
    return addressHelper.getAddressList();
  }

  @Override
  public ArrayList<AddressBookSlim> addNewAddress(String address) {
    return addressHelper.addNewAddress(address);
  }

  public AddressHelper getAddressHelper() {
    return addressHelper;
  }

  @Inject
  public void setAddressHelper(AddressHelper addressHelper) {
    this.addressHelper = addressHelper;
  }



}
