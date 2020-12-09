package com.movie.site.mapper;

import com.movie.site.dto.response.GetAllMovieDtoResponse;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.movie.site.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public abstract class MovieMapperDecorator implements MovieMapper {

    @Autowired
    private MovieMapper delegate;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private RatingMapper ratingMapper;

    @Override
    public GetByIdMovieDtoResponse toGetByIdDto(Movie movie, Pageable reviewPageable, User user) {
        GetByIdMovieDtoResponse movieDto = delegate.toGetByIdDto(movie, reviewPageable, user);
        movieDto.setReviews(reviewService.findAll(movie, reviewPageable));
        movieDto.setUserRating(ratingMapper.toRatingDto(movie.getRating(user)));
        Optional.ofNullable(user)
                .ifPresent(u -> movieDto.setOperation(u.getMovieOperation(movie)));

        return movieDto;
    }

    @Override
    public GetAllMovieDtoResponse toGetAllDto(Movie movie, User user) {
        GetAllMovieDtoResponse movieDto = delegate.toGetAllDto(movie, user);
        Optional.ofNullable(user)
                .ifPresent(u -> movieDto.setOperation(u.getMovieOperation(movie)));

        return movieDto;
    }
}
