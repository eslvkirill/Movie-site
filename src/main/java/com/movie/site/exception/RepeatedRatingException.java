package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RepeatedRatingException extends RuntimeException {

    public RepeatedRatingException(Long movieId, String username) {
        super("Movie with id " + movieId + " already contains a rating from the user " + username);
    }
}
