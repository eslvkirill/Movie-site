package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateReviewDtoRequest;
import com.movie.site.dto.request.UpdateReviewDtoRequest;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.exception.MovieReviewNotFoundException;
import com.movie.site.exception.RepeatedReviewException;
import com.movie.site.exception.ReviewNotFoundException;
import com.movie.site.mapper.ReviewMapper;
import com.movie.site.model.Movie;
import com.movie.site.model.Review;
import com.movie.site.model.User;
import com.movie.site.repository.ReviewRepository;
import com.movie.site.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Override
    public ReviewDtoResponse create(Movie movie, User user, CreateReviewDtoRequest reviewDto) {
        Review review = reviewMapper.toEntity(reviewDto);

        review.setMovie(movie);
        review.setUser(user);

        if (movie.containsReview(user)) {
            throw new RepeatedReviewException(movie.getId(), user.getEmail());
        }

        return reviewMapper.toDto(reviewRepository.save(review));
    }

    @Override
    public ReviewDtoResponse update(Movie movie, Long id, UpdateReviewDtoRequest reviewDto) {
        Review review = findById(id);

        if (!movie.containsReview(review)) {
            throw new MovieReviewNotFoundException(movie.getId(), id);
        }

        Review updatedReview = reviewMapper.update(reviewDto, review);

        return reviewMapper.toDto(reviewRepository.save(updatedReview));
    }

    @Override
    public ReviewDtoResponse delete(Movie movie, Long id) {
        Review review = findById(id);

        if (!movie.containsReview(review)) {
            throw new MovieReviewNotFoundException(movie.getId(), id);
        }

        reviewRepository.delete(review);

        return reviewMapper.toDto(review);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReviewDtoResponse> findAll(Movie movie, Pageable pageable) {
        return reviewMapper.toDtoPage(reviewRepository.findAllByMovie(movie, pageable));
    }

    private Review findById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(id));
    }
}
