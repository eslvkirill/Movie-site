package com.movie.site.service;

import com.movie.site.dto.request.*;
import com.movie.site.dto.response.*;
import com.movie.site.model.Movie;
import com.movie.site.model.User;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieService {

    Movie create(CreateMovieDtoRequest movieDto);

    GetByIdMovieDtoResponse findById(Long id, Pageable reviewPageable);

    ReviewDtoResponse addReview(Long id, CreateReviewDtoRequest reviewDto);

    void updateReview(Long movieId, Long reviewId,
                      UpdateReviewDtoRequest reviewDto);

    void removeReview(Long movieId, Long reviewId);

    Page<ReviewDtoResponse> findAllReviews(Long id, Pageable pageable);

    Page<GetAllMovieDtoResponse> findAll(Predicate predicate, Pageable pageable);

    Movie addRating(Long id, CreateRatingDtoRequest ratingDto);

    Movie updateRating(Long id, UpdateRatingDtoRequest ratingDto);

    Movie removeRating(Long id);

    Movie findByIdLocal(Long id);

    void update(Long id, UpdateMovieDtoRequest movieDto);

    void updateActivity(Long id);

    SaveMovieDtoResponse findById(Long id);

    List<GetCartMovieDtoResponse> findAllByPossibleBuyer(User user,
                                                         Pageable pageable);
}
