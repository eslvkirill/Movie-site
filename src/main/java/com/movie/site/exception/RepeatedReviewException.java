package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RepeatedReviewException extends RuntimeException {

    public RepeatedReviewException(Long movieId, String email) {
        super("Movie with id " + movieId + " already contains a review from the user " + email);
    }
}
