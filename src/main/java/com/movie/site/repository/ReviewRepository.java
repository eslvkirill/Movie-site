package com.movie.site.repository;

import com.movie.site.model.Movie;
import com.movie.site.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findAllByMovie(Movie movie, Pageable pageable);
}
