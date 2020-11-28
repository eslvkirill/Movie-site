package com.movie.site.repository;

import com.movie.site.model.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Slice<Movie> findAllByActiveIsTrue(Pageable pageable); // only one method findAll just with access filter
}
