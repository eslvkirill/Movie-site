package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GenreNotFoundException extends RuntimeException {

    public GenreNotFoundException(Long id) {
        super("Couldn't find genre with id: " + id);
    }

    public GenreNotFoundException(Iterable<Long> ids) {
        super("Couldn't find any genre with ids: " + ids);
    }
}
