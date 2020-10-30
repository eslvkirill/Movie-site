package com.movie.site.annotation;

import com.movie.site.validator.FileValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FileValidator.class)
@Documented
public @interface File {

    String message() default "incorrect file";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String[] extensions();
}
