package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RepeatedCategoryItemException extends RuntimeException {

    public RepeatedCategoryItemException(String username, String categoryName, Long movieId) {
        super("The " + username + " user already has movie with id " + movieId + " in " + categoryName + " category");
    }
}
