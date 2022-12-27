
package com.demo.AddressBook.config;

import com.demo.AddressBook.core.AddressBookConfig;

@AddressBookConfig
public class AddressConfig {

  private Boolean loadTestData;

  public Boolean getLoadTestData() {
    return loadTestData;
  }

  public void setLoadTestData(Boolean loadTestData) {
    this.loadTestData = loadTestData;
  }
}
