package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EnumNotFoundException extends RuntimeException {

    public EnumNotFoundException(Class<? extends Enum<?>> clazz, String value) {
        super("Couldn't find an object in the " + clazz.getSimpleName() +
                " enum by the specified value: " + value);
    }
}
