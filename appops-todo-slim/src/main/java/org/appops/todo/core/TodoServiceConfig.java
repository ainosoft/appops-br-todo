
package org.appops.todo.core;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import org.appops.core.annotation.Config;

@Config
@TodoService
@Retention(RetentionPolicy.RUNTIME)
public @interface TodoServiceConfig {

}
