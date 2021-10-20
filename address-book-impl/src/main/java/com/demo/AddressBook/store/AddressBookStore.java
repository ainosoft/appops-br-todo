
package com.demo.AddressBook.store;

import com.demo.AddressBook.slim.AddressBookSlim;
import java.util.ArrayList;


public class AddressBookStore {

  ArrayList<AddressBookSlim> addressBookList = new ArrayList<AddressBookSlim>();

  public AddressBookStore() {
    createMockData();
  }

  private void createMockData() {
    AddressBookSlim addressBookSlim1 = new AddressBookSlim();
    addressBookSlim1.setAddress("Pune");

    AddressBookSlim addressBookSlim2 = new AddressBookSlim();
    addressBookSlim2.setAddress("Mumbai");

    AddressBookSlim addressBookSlim3 = new AddressBookSlim();
    addressBookSlim3.setAddress("Nashik");

    addressBookList.add(addressBookSlim1);
    addressBookList.add(addressBookSlim2);
    addressBookList.add(addressBookSlim3);

  }


  public ArrayList<AddressBookSlim> getAddressBookList() {
    return addressBookList;
  }


  public ArrayList<AddressBookSlim> addNewAddress(String address) {
    AddressBookSlim addressBookSlim = new AddressBookSlim();
    addressBookSlim.setAddress(address);
    addressBookList.add(addressBookSlim);
    return addressBookList;
  }

}
