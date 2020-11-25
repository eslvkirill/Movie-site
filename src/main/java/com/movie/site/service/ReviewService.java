package com.movie.site.service;

import com.movie.site.dto.request.CreateReviewDtoRequest;
import com.movie.site.dto.request.UpdateReviewDtoRequest;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    ReviewDtoResponse create(Movie movie, CreateReviewDtoRequest reviewDto);

    ReviewDtoResponse update(Movie movie, Long id, UpdateReviewDtoRequest reviewDto);

    ReviewDtoResponse delete(Movie movie, Long id);

    Page<ReviewDtoResponse> findAll(Movie movie, Pageable pageable);
}
