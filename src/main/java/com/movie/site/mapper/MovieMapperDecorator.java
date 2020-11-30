package com.movie.site.mapper;

import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.movie.site.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

public abstract class MovieMapperDecorator implements MovieMapper {

    @Autowired
    private MovieMapper delegate;

    @Autowired
    private ReviewService reviewService;

    @Override
    public GetByIdMovieDtoResponse toGetByIdDto(Movie movie, Pageable reviewPageable, User user) {
        GetByIdMovieDtoResponse movieDto = delegate.toGetByIdDto(movie, reviewPageable, user);
        movieDto.setReviews(reviewService.findAll(movie, reviewPageable));

        return movieDto;
    }
}
