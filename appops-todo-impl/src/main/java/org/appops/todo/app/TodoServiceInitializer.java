
package org.appops.todo.app;

import com.google.inject.Inject;
import com.google.inject.Provider;
import java.lang.annotation.Annotation;
import org.appops.core.deployment.ServiceConfiguration;
import org.appops.service.ServiceInitializer;
import org.appops.service.generator.ServiceMetaGenerator;
import org.appops.slim.base.api.ServiceMetaManager;
import org.appops.todo.core.TodoService;

@TodoService
public class TodoServiceInitializer extends ServiceInitializer {

  /**
   * Initializer class.
   *
   * @param serviceMetaGenerator service meta generator .
   * @param serviceMetaManager service manager .
   */
  @Inject
  public TodoServiceInitializer(Provider<ServiceMetaGenerator> serviceMetaGenerator,
      Provider<ServiceMetaManager> serviceMetaManager) {
    super(serviceMetaGenerator, serviceMetaManager);
  }


  @Override
  public String initialize(String serviceName, ServiceConfiguration config,
      Class<? extends Annotation> serviceAnnotation) {
    addServiceMeta(serviceName, config, serviceAnnotation);
    return serviceName;
  }


}
