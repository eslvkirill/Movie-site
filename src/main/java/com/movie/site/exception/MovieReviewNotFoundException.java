package com.movie.site.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MovieReviewNotFoundException extends RuntimeException {

    public MovieReviewNotFoundException(Long movieId, Long reviewId) {
        super("Movie with id " + movieId + " doesn't contain a review with id " + reviewId);
    }
}
