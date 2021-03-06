package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ReviewNotFoundException extends RuntimeException {

    public ReviewNotFoundException(Long id) {
        super("Couldn't find review with id: " + id);
    }
}
