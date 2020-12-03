package com.movie.site.validator;

import com.movie.site.annotation.Zero;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ZeroValidator implements ConstraintValidator<Zero, Number> {

    @Override
    public boolean isValid(Number number, ConstraintValidatorContext ctx) {
        return number.doubleValue() == 0;
    }
}
