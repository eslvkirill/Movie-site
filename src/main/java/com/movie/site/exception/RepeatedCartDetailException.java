package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RepeatedCartDetailException extends RuntimeException {

    public RepeatedCartDetailException(String username, Long movieId) {
        super("The " + username + " user's shopping cart already contains movie with id " + movieId);
    }
}
