package com.movie.site.annotation;

import com.movie.site.validator.ZeroValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ZeroValidator.class)
@Documented
public @interface Zero {

    String message() default "must be 0";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
