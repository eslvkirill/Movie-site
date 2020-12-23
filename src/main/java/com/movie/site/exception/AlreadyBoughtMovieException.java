package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyBoughtMovieException extends RuntimeException {

    public AlreadyBoughtMovieException(String username, Long movieId) {
        super("The " + username + " user has already bought movie with id " + movieId);
    }
}
