package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MovieRatingNotFoundException extends RuntimeException {

    public MovieRatingNotFoundException(Long movieId, String username) {
        super("Movie with id " + movieId + " doesn't contain a rating from the user " + username);
    }
}
