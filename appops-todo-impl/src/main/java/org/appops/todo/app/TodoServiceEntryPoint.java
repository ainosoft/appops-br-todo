
package org.appops.todo.app;

import java.io.FileNotFoundException;
import org.appops.core.ServiceException;
import org.appops.service.entrypoint.ServiceEntryPoint;



public class TodoServiceEntryPoint extends ServiceEntryPoint {

  public static void main(String[] args) throws FileNotFoundException, ServiceException {
    new TodoServiceEntryPoint().startService(args);
  }
}
