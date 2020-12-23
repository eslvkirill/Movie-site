package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserOrderNotFoundException extends RuntimeException {

    public UserOrderNotFoundException(String username, Long orderId) {
        super("User " + username + " doesn't have an order with id " + orderId);
    }
}
