package org.appops.hello.core;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import org.appops.core.annotation.Config;

@Config
@HelloService
@Retention(RetentionPolicy.RUNTIME)
public @interface HelloServiceConfig {
  /*
   * Add this annotation on top of configuration classes which you will create to provide
   * configurations.
   */
}
