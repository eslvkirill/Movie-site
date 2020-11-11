package com.movie.site.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.validation.ConstraintValidatorContext;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationUtils {

    public static void addConstraintViolation(String message,
                                              ConstraintValidatorContext ctx) {
        ctx.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation();
    }
}
