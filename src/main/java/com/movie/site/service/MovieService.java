package com.movie.site.service;

import com.movie.site.dto.request.CreateMovieDtoRequest;
import com.movie.site.dto.request.CreateReviewDtoRequest;
import com.movie.site.dto.request.UpdateReviewDtoRequest;
import com.movie.site.dto.response.GetByIdMovieDtoResponse;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MovieService {

    Movie create(CreateMovieDtoRequest movieDto);

    GetByIdMovieDtoResponse findById(Long id, Pageable reviewPageable);

    ReviewDtoResponse addReview(Long id, CreateReviewDtoRequest reviewDto);

    void updateReview(Long movieId, Long reviewId,
                      UpdateReviewDtoRequest reviewDto);

    void removeReview(Long movieId, Long reviewId);

    Page<ReviewDtoResponse> findAllReviews(Long id, Pageable pageable);

    boolean hasAlreadyWrittenReview(Long id);
}
