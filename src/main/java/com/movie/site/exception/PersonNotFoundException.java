package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(Long id) {
        super("Couldn't find person with id: " + id);
    }

    public PersonNotFoundException(Iterable<Long> ids) {
        super("Couldn't find any person with ids: " + ids);
    }
}
