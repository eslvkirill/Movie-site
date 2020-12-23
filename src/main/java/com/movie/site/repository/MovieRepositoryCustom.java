package com.movie.site.repository;

import com.movie.site.model.Movie;
import com.movie.site.model.Order;
import com.movie.site.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieRepositoryCustom {

    List<Movie> findAllByPossibleBuyer(User user, Pageable pageable);

    Page<Movie> findAllByOrder(Order order, Pageable pageable);
}
