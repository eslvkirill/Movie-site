package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CategoryItemNotFoundException extends RuntimeException {

    public CategoryItemNotFoundException(String username, String categoryName, Long movieId) {
        super("User " + username + " doesn't have movie with id " + movieId + " in " + categoryName + " category");
    }
}
