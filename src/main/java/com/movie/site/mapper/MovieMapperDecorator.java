package com.movie.site.mapper;

import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

public abstract class MovieMapperDecorator implements MovieMapper {

    @Autowired
    private MovieMapper delegate;

    @Autowired
    private ReviewService reviewService;

    @Override
    public GetByIdMovieDtoResponse toDto(Movie movie, Pageable reviewPageable) {
        GetByIdMovieDtoResponse movieDto = delegate.toDto(movie, reviewPageable);
        movieDto.setReviews(reviewService.findAll(movie, reviewPageable));

        return movieDto;
    }
}
