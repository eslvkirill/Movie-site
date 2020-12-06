package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CartDetailNotFoundException extends RuntimeException {

    public CartDetailNotFoundException(String username, Long movieId) {
        super("The " + username + " user's shopping cart doesn't contain movie with id " + movieId);
    }
}
