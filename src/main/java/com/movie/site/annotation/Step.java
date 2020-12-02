package com.movie.site.annotation;

import com.movie.site.validator.StepValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StepValidator.class)
@Documented
public @interface Step {

    String message() default "value must be divisible by a step without a remainder";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    float value();
}
