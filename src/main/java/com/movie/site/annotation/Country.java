package com.movie.site.annotation;

import com.movie.site.validator.CountriesValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CountriesValidator.class)
@Documented
public @interface Country {

    String message() default "недопустимое значение";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
